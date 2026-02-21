import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ["employee", "manager", "admin", "hr", "intern"],
      lowercase: true,
      default: "employee",
    },

    // PASSWORD (OPTIONAL FOR GOOGLE USERS)
    password: {
      type: String,
      required: function () {
        return this.authType === "local";
      },
    },

    department: {
      type: String,
      default: "General",
    },

    // 🔹 AUTH TYPE
    authType: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    dateJoined: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password ONLY if it exists & changed
userSchema.pre("save", async function (next) {
  if (!this.password) return next();
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password ONLY for local users
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.authType !== "local" || !this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
