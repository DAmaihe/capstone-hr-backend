import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllEmployees, createEmployee, getEmployeeDetails, deleteEmployee } from "../Controllers/hrController.js";

const router = express.Router();

// HR routes
router.get("/employees", authMiddleware.protect, authMiddleware.authorizeRole(["hr"]), getAllEmployees);
router.post("/employees", authMiddleware.protect, authMiddleware.authorizeRole(["hr"]), createEmployee);
router.get("/employees/:id", authMiddleware.protect, authMiddleware.authorizeRole(["hr"]), getEmployeeDetails);
router.delete("/employees/:id", authMiddleware.protect, authMiddleware.authorizeRole(["hr"]), deleteEmployee);

export default router;
