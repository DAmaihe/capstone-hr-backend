// authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

/**
 * Protect routes by verifying JWT token.
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request, excluding password
      req.user = await User.findById(decoded.id).select("-password");

      return next(); // Proceed to next middleware/controller
    } catch (error) {
      console.error("JWT verification failed:", error);
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

/**
 * Authorize user based on role(s)
 * @param {Array} roles - Array of allowed roles
 */
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authorized, no user found" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient privileges",
      });
    }

    next();
  };
};

// Export both functions as a single default object
export default {
  protect,
  authorizeRole,
};
