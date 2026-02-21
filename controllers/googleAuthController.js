import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// GOOGLE AUTH CONTROLLER
export const googleAuth = async (req, res) => {
  const { idToken } = req.body;

  // Guard 1: Token must exist
  if (!idToken) {
    return res.status(400).json({
      success: false,
      message: "Google ID token is required",
    });
  }

  try {
    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token payload",
      });
    }

    const { sub: googleId, email, name, picture } = payload;

    //Guard 2: Email must exist
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google account does not provide an email",
      });
    }

    //Find existing user
    let user = await User.findOne({ email });

    //Link existing LOCAL account to Google
    if (user && user.authType === "local") {
      user.googleId = googleId;
      user.authType = "google";
      user.profileImage = picture;
      await user.save();
    }

    // Create new Google user
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        authType: "google",
        profileImage: picture || "",
        role: "employee",              // default role
        password: "GOOGLE_AUTH",        // placeholder (never used)
      });
    }

    //Generate JWT
    const token = generateToken(user);

    // Success response
    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        authType: user.authType,
      },
    });
  } catch (error) {
    console.error("Google authentication error:", error);

    // Generic server error (safe for frontend)
    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};
