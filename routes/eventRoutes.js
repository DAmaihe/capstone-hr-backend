import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createEvent, getEvents, updateEvent, deleteEvent } from "../Controllers/eventController.js";

const router = express.Router();

// Event routes
router.post("/", authMiddleware.protect, authMiddleware.authorizeRole(["HR", "admin"]), createEvent);
router.get("/", authMiddleware.protect, getEvents);
router.put("/:id", authMiddleware.protect, authMiddleware.authorizeRole(["HR", "admin"]), updateEvent);
router.delete("/:id", authMiddleware.protect, authMiddleware.authorizeRole(["HR", "admin"]), deleteEvent);

export default router;
