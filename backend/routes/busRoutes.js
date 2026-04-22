import express from "express";
import {
  getAllBuses,
  getBusAnalytics,
  getBusById,
} from "../controllers/busController.js";

const router = express.Router();

router.get("/analytics/summary", getBusAnalytics);
router.get("/", getAllBuses);
router.get("/:id", getBusById);

export default router;
