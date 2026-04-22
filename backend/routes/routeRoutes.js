import express from "express";
import {
  createRoute,
  getAllRoutes,
  updateRoute,
} from "../controllers/routeController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getAllRoutes);
router.post("/", adminAuth, createRoute);
router.put("/:id", adminAuth, updateRoute);

export default router;
