import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      default: null,
    },
    category: {
      type: String,
      enum: [
        "bus_late",
        "overcrowding",
        "driver_behavior",
        "skipped_stop",
        "cleanliness",
        "lost_item",
        "wrong_eta",
        "other",
      ],
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true },
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
