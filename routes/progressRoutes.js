import express from "express";
import { addProgress, getProgressByTask } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addProgress);
router.get("/:taskId", protect, getProgressByTask);

export default router;
