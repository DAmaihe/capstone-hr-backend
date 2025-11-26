import express from "express";
import {
  addChecklistItem,
  getChecklistByTask,
  updateChecklistItem,
  deleteChecklistItem,
} from "../controllers/checklistController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only authenticated users can manage checklists
router.post("/", protect, authorizeRoles("hr", "manager"), addChecklistItem);
router.get("/:taskId", protect, getChecklistByTask);
router.put("/:id", protect, updateChecklistItem);
router.delete("/:id", protect, authorizeRoles("hr", "manager"), deleteChecklistItem);

export default router;
