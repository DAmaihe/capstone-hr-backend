import express from "express";
import { protect } from "../middleware/authMiddleware.js";

// User controllers
import {
  createUser,
  loginUser,
  getMe,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// Google auth controller (separate file)
import { googleAuth } from "../controllers/googleAuthController.js";

const router = express.Router();

/**
 * ===============================
 * Public Routes
 * ===============================
 */
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);

/**
 * ===============================
 * Protected Routes
 * ===============================
 */
router.get("/me", protect, getMe);
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;