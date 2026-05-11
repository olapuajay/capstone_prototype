import express from "express";
import {
  createTicket,
  getPassengerTickets,
  getTicketMessages,
  addTicketMessage,
  getAllTickets,
  updateTicketStatus,
} from "../controllers/ticketController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Passenger routes
router.post("/", authMiddleware, createTicket);
router.get("/my-tickets", authMiddleware, getPassengerTickets);
router.get("/:ticketId/messages", authMiddleware, getTicketMessages);
router.post("/:ticketId/message", authMiddleware, addTicketMessage);

// Admin routes
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllTickets);
router.put(
  "/:ticketId/status",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateTicketStatus,
);

export default router;
