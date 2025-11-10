import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendMessage, getMessages, getUnreadCount, markAsRead } from "../Controllers/messageController.js";

const router = express.Router();

// Message routes
router.post("/", authMiddleware.protect, sendMessage);
router.get("/", authMiddleware.protect, getMessages);
router.get("/unread/count", authMiddleware.protect, getUnreadCount);
router.put("/:id/read", authMiddleware.protect, markAsRead);

export default router;
