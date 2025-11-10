import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controllers/userController.js";

const router = express.Router();

// Public routes
router.post("/", createUser);
router.post("/login", loginUser);

// Protected routes
router.get("/", authMiddleware.protect, getAllUsers);
router.get("/:id", authMiddleware.protect, getUserById);
router.put("/:id", authMiddleware.protect, updateUser);
router.delete("/:id", authMiddleware.protect, deleteUser);

export default router;
