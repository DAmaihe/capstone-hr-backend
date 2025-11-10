import express from "express";
import {
  addChecklistItem,
  getChecklistByTask,
  updateChecklistItem,
  deleteChecklistItem,
} from "../Controllers/checklistController.js";

const router = express.Router();

// Checklist routes
router.post("/", addChecklistItem);
router.get("/:taskId", getChecklistByTask);
router.put("/:id", updateChecklistItem);
router.delete("/:id", deleteChecklistItem);

export default router;
