import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
      enum: [
        "Government ID",
        "Offer Letter",
        "Tax Form",
        "Direct Deposit",
        "Other",
      ],
    },

    originalName: {
      type: String,
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    path: {
      type: String,
      required: true,
    },

    mimetype: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    workspace: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending Review", "Approved", "Rejected"],
      default: "Pending Review",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reviewedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
