// workers/reminderWorker.js
import "dotenv/config";
import mongoose from "mongoose";
import transporter from "../email/transporter.js";
import Planned from "../models/PlannedSchema.js";   // your model (unchanged)
import "../models/UserSchema.js";                   // registers "User" model name

// helper: format Pakistan time for the email (display only)
function fmtPakistan(dt) {
  return new Intl.DateTimeFormat("en-PK", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(dt);
}

// Send one reminder email
async function sendReminderEmail({ user, reminder }) {
  const username = user?.username || "there";
  const to = user?.email;
  if (!to) throw new Error("User has no email");

  const plannedUtc = new Date(reminder.plannedAt);
  const plannedPk = fmtPakistan(plannedUtc);

  const mailOptions = {
    from: `"WatchList" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reminder for your planned watch",
    text: `Hi ${username},

This is your reminder.

Planned time (Pakistan): ${plannedPk}
Planned time (UTC):      ${plannedUtc.toISOString()}
Lead minutes:            ${reminder.leadMinutes}

Enjoy!`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`[mail] sent to ${to} for reminder ${reminder._id}`);
}

// Tick: find+send due reminders
async function runTick() {
  const now = new Date();
  console.log("[tick] now UTC:", now.toISOString());

  // Due if: plannedAt - (leadMinutes * 60k ms) <= now
  const due = await Planned.find({
    active: true,
    reminderSent: false,
    $expr: {
      $lte: [
        { $subtract: ["$plannedAt", { $multiply: ["$leadMinutes", 60000] }] },
        now,
      ],
    },
  })
    .limit(100)
    .populate("userId", "email username"); // get user's email+name

  console.log(`[tick] due count: ${due.length}`);

  for (const r of due) {
    const user = r.userId;
    try {
      await sendReminderEmail({ user, reminder: r });

      // mark as sent (idempotent guard)
      await Planned.updateOne(
        { _id: r._id, reminderSent: false },
        { $set: { reminderSent: true } }
      );
      console.log(`[db] marked sent: ${r._id}`);
    } catch (err) {
      console.error(`[error] reminder ${r._id}:`, err.message);
      // keep unsent to retry next tick
    }
  }
}

// Bootstrap
async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing");
  await mongoose.connect(process.env.MONGODB_URI); // NOTE: uses MONGODB_URI
  console.log("Reminder worker connected to MongoDB");

  // run once on start, then every minute
  await runTick();
  setInterval(runTick, 60 * 1000);
}

main().catch((e) => {
  console.error("Worker fatal error:", e);
  process.exit(1);
});
