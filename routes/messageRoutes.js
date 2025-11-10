import express from "express";
import {
  sendMessage,
  getMessages,
  getUnreadCount,
  markAsRead,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only employees and HR can send messages
router.post("/", protect, authorizeRoles("employee", "hr"), sendMessage);

// All authenticated users can view messages
router.get("/", protect, getMessages);
router.get("/unread/count", protect, getUnreadCount);

// Only the message owner or HR can mark as read (optional, logic can be inside controller)
router.put("/:id/read", protect, authorizeRoles("employee", "hr"), markAsRead);

export default router;
