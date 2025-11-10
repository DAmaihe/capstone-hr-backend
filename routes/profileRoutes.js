import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, deleteProfile } from "../Controllers/profileController.js";

const router = express.Router();

// Profile routes
router.get("/me", authMiddleware.protect, getProfile);
router.put("/update", authMiddleware.protect, updateProfile);
router.delete("/delete/:id", authMiddleware.protect, authMiddleware.authorizeRole(["admin"]), deleteProfile);

export default router;
