import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";

import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

import User from "./Model/userModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = [
  "http://localhost:5173",
  "https://smartstart-frontend.vercel.app",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/events", eventRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/documents", documentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", passwordRoutes); // covers /api/forgot and /api/reset
app.use("/api/messages", messageRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/employee", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the SmartStart HR API");
});

// Connect to MongoDB and seed default admin
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Seed default admin if not present
    const existingAdmin = await User.findOne({ email: "admin@hr.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      const adminUser = new User({
        name: "System Admin",
        email: "admin@hr.com",
        password: hashedPassword,
        role: "hr",
        department: "HR",
      });
      await adminUser.save();
      console.log("Default Admin created:");
      console.log("Email: admin@hr.com");
      console.log("Password: Admin@123");
    } else {
      console.log("Admin already exists, skipping seeding.");
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("MongoDB connection or seeding error:", err);
    process.exit(1);
  }
};

startServer();
