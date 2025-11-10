import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addProgress, getProgressByTask } from "../Controllers/progressController.js";

const router = express.Router();

router.post("/", authMiddleware.protect, addProgress);
router.get("/:taskId", authMiddleware.protect, getProgressByTask);

export default router;
