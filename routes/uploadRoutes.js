import express from "express";
import { upload, uploadFile } from "../Controllers/uploadController.js";

const router = express.Router();

// Upload file route
router.post("/", upload.single("file"), uploadFile);

export default router;
