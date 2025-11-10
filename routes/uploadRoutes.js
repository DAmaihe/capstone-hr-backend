import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { uploadFile } from "../controllers/uploadController.js"; // Ensure correct function name

const router = express.Router();

router.post("/upload", protect, uploadFile);

export default router;
