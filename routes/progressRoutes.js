import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyProgress,
  updateProgressStatus,
} from "../controllers/progressController.js";

const router = express.Router();

/**
 * EMPLOYEE — Get my progress (all assigned checklist tasks)
 */
router.get(
  "/my",
  protect,
  getMyProgress
);

/**
 * EMPLOYEE — Update progress status for a task
 */
router.put(
  "/:progressId",
  protect,
  updateProgressStatus
);

export default router;
