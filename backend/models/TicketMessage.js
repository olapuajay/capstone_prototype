import mongoose from "mongoose";

const ticketMessageSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderRole: {
      type: String,
      enum: ["passenger", "admin"],
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

const TicketMessage = mongoose.model("TicketMessage", ticketMessageSchema);

export default TicketMessage;
