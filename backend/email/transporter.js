// email/transporter.js
import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,     // must be your Gmail address
    pass: process.env.EMAIL_PASS,     // use a Gmail App Password
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((err) => {
  if (err) console.error("SMTP connection failed:", err);
  else console.log("SMTP: ready to send emails");
});

export default transporter;
