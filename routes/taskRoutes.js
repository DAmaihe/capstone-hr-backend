import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
        createTask,
         getTasksByEmployee,
            updateTaskStatus,
             addChecklistItem,
               toggleChecklistItem,
                  deleteChecklistItem,
} from "../controllers/taskController.js";

const router = express.Router();

// Task routes
router.post("/", authMiddleware.protect, createTask);
router.get("/:employeeId", authMiddleware.protect, getTasksByEmployee);
router.put("/:id", authMiddleware.protect, updateTaskStatus);

// Checklist operations
router.post("/:taskId/checklist", authMiddleware.protect, addChecklistItem);
router.put("/:taskId/checklist/:itemId", authMiddleware.protect, toggleChecklistItem);
router.delete("/:taskId/checklist/:itemId", authMiddleware.protect, deleteChecklistItem);

export default router;
