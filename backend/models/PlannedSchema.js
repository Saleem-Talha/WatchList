import mongoose from "mongoose";

const { Schema } = mongoose;

const PlannedSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    mediaItemId: {
      type: Schema.Types.ObjectId,
      ref: "MediaItem",
      required: true,
      index: true,
    },

    // When the user plans to watch (UTC in DB)
    plannedAt: { type: Date, required: true },

    // How many minutes BEFORE plannedAt to send the reminder
    leadMinutes: {
      type: Number,
      default: 60,
      min: 0,
      // (optional) put a reasonable upper bound; 7 days = 10080 minutes
      max: 10080,
    },

    // Delivery bookkeeping
    reminderSent: { type: Boolean, default: false },

    // Soft cancellation flag (keeps history if you want it)
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Planned", PlannedSchema);