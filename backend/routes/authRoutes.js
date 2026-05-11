import express from "express";
import {
  registerPassenger,
  loginPassenger,
  loginDriver,
  loginAdmin,
} from "../controllers/authController.js";

const router = express.Router();

// Passenger routes
router.post("/passenger/register", registerPassenger);
router.post("/passenger/login", loginPassenger);

// Driver routes
router.post("/driver/login", loginDriver);

// Admin route
router.post("/admin/login", loginAdmin);

export default router;
