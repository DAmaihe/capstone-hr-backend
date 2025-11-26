// models/documentModel.js
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  uploadedAt: { type: Date, default: Date.now },
  workspace: { type: String }, // optional: if you implement company workspace
});

export default mongoose.model("Document", documentSchema);
