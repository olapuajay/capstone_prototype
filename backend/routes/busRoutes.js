import express from "express";
import {
  getAllBuses,
  getBusAnalytics,
  getBusById,
  updateBusStatus,
} from "../controllers/busController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/analytics/summary", getBusAnalytics);
router.get("/", getAllBuses);
router.get("/:id", getBusById);
router.put(
  "/:busId/status",
  authMiddleware,
  roleMiddleware(["driver", "admin"]),
  updateBusStatus,
);

export default router;
