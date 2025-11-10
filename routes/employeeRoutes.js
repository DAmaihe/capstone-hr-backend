import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, getAssignedTasks } from "../Controllers/employeeController.js";

const router = express.Router();

// Employee routes
router.get("/me", authMiddleware.protect, authMiddleware.authorizeRole(["employee"]), getProfile);
router.put("/me", authMiddleware.protect, authMiddleware.authorizeRole(["employee"]), updateProfile);
router.get("/me/tasks", authMiddleware.protect, authMiddleware.authorizeRole(["employee"]), getAssignedTasks);

export default router;
