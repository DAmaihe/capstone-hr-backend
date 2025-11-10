import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { getAllEmployees, createEmployee, getEmployeeDetails, deleteEmployee } from "../controllers/hrController.js";

const router = express.Router();

router.get("/employees", protect, authorizeRoles("hr"), getAllEmployees);
router.post("/employee", protect, authorizeRoles("hr"), createEmployee);
router.get("/employees/:id", protect, authorizeRoles("hr"), getEmployeeDetails);
router.delete("/employees/:id", protect, authorizeRoles("hr"), deleteEmployee);

export default router;
