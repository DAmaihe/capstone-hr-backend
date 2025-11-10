import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("hr", "manager"), createEvent);
router.get("/", protect, getEvents);
router.put("/:id", protect, authorizeRoles("hr", "manager"), updateEvent);
router.delete("/:id", protect, authorizeRoles("hr", "manager"), deleteEvent);

export default router;
