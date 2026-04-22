import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import busRoutes from "./routes/busRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import { seedInitialData } from "./services/seedDataService.js";
import { startSimulationService } from "./services/simulationService.js";
import { initializeSocket } from "./socket/socketHandler.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "bus-tracker-backend" });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (username === expectedUsername && password === expectedPassword) {
    return res.json({ success: true });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid credentials" });
});

app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  await connectDB();
  await seedInitialData();

  initializeSocket(io);
  startSimulationService(io);

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

bootstrap();
