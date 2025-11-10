import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all uploaded documents (optional protection)
router.get("/", authMiddleware.protect, async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadDir)) {
      return res.status(404).json({ success: false, message: "No uploads found" });
    }

    const files = fs.readdirSync(uploadDir);
    const fileList = files.map((file) => ({
      name: file,
      url: `/uploads/${file}`,
    }));

    res.json({ success: true, files: fileList });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
