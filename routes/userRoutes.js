import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createUser,
  loginUser,
  getMe,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Public routes
router.post("/register", createUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", protect, getMe);
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
