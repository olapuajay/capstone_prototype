import Ticket from "../models/Ticket.js";
import TicketMessage from "../models/TicketMessage.js";

export const createTicket = async (req, res) => {
  try {
    const { category, message } = req.body;
    const passengerId = req.user.id;

    const ticket = await Ticket.create({
      passenger: passengerId,
      category,
      message,
      status: "open",
      priority: "medium",
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPassengerTickets = async (req, res) => {
  try {
    const passengerId = req.user.id;

    const tickets = await Ticket.find({ passenger: passengerId })
      .populate("bus", "name busNumber")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTicketMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const messages = await TicketMessage.find({ ticket: ticketId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTicketMessage = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const ticketMessage = await TicketMessage.create({
      ticket: ticketId,
      sender: userId,
      senderRole: userRole,
      message,
    });

    await ticketMessage.populate("sender", "name email");

    res.status(201).json({
      success: true,
      message: "Message added successfully",
      ticketMessage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("passenger", "name email mobile")
      .populate("bus", "name busNumber")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true },
    );

    res.json({
      success: true,
      message: "Ticket status updated",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
