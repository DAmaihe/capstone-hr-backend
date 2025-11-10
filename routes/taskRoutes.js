import express from "express";
import {
  createTask,
  getTasksByEmployee,
  updateTaskStatus,
  addChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only HR and manager can create tasks
router.post("/", protect, authorizeRoles("hr", "manager"), createTask);
router.get("/:employeeId", protect, authorizeRoles("hr", "manager", "employee"), getTasksByEmployee);
router.put("/:id", protect, authorizeRoles("hr", "manager"), updateTaskStatus);

// Checklist operations
router.post("/:taskId/checklist", protect, authorizeRoles("hr", "manager"), addChecklistItem); 
router.put("/:taskId/checklist/:itemId", protect, authorizeRoles("hr", "manager"), toggleChecklistItem); 
router.delete("/:taskId/checklist/:itemId", protect, authorizeRoles("hr", "manager"), deleteChecklistItem); 

export default router;
