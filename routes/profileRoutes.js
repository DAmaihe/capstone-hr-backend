import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { getProfile, updateProfile, deleteProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/update", protect, updateProfile);
// Only admins can delete a profile
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteProfile);

export default router;
