import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { getProfile, updateProfile, getAssignedTasks } from "../controllers/employeeController.js";

const router = express.Router();

// Employee routes
router.get("/me", protect, authorizeRoles("employee"), getProfile);
router.put("/me", protect, authorizeRoles("employee"), updateProfile);
router.get("/me/tasks", protect, authorizeRoles("employee"), getAssignedTasks);

export default router;
