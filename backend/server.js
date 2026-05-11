import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { seedInitialData } from "./services/seedDataService.js";
import { startSimulationService } from "./services/simulationService.js";
import { initializeSocket } from "./socket/socketHandler.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "smartbus-tracker-backend" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Bus routes
app.use("/api/buses", busRoutes);

// Route routes
app.use("/api/routes", routeRoutes);

// Ticket routes
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send({ message: "SmartBus Tracker Backend" });
});

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  await connectDB();
  await seedInitialData();

  initializeSocket(io);
  startSimulationService(io);

  server.listen(PORT, () => {
    console.log(`SmartBus Tracker Backend listening on port ${PORT}`);
  });
};

bootstrap();
