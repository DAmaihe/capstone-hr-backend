import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER NEW USER
export const createUser = async (req, res) => {
  const { name, email, password, role, department } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password, // raw password, will be hashed automatically
      role: role?.toLowerCase() || "employee",
      department: department || "General",
    });

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password, expectedRole } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
 // BLOCK GOOGLE ACCOUNTS FROM PASSWORD LOGIN
    if (user.authType === "google") {
      return res.status(400).json({
        success: false,
        message: "Please login using Google",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    if (expectedRole && user.role.toLowerCase() !== expectedRole.toLowerCase()) {
      return res.status(403).json({ success: false, message: "Unauthorized role" });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GOOGLE AUTH LOGIN/SIGNUP
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ success: false, message: "No Google token provided" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    // If not, create new user
    if (!user) {
      user = await User.create({
        name,
        email,
        password: Math.random().toString(36).slice(-8), // dummy password
        role: "employee",
        profileImage: picture,
        department: "General",
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Google authentication successful",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ success: false, message: "Google authentication failed" });
  }
};

// GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    Object.assign(user, updates);
    await user.save();

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
