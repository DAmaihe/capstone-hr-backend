import multer from "multer";
import path from "path";
import Document from "../model/documentModel.js";

// ------------------------------
// Multer configuration
// ------------------------------
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // Ensure this folder exists
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const cleanName = file.originalname.replace(/\s+/g, "_"); // Remove spaces
      cb(null, `${timestamp}-${cleanName}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "text/plain"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type. Only JPEG, PNG, PDF, and TXT allowed."));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
});

// ------------------------------
// Upload a document
// ------------------------------
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    // Save to MongoDB
    const document = await Document.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user._id,
      workspace: req.user.workspace || null, // Optional for future workspace feature
    });

    // Build public URL for frontend
    const fileUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        id: document._id,
        originalName: document.originalName,
        fileUrl,
        mimetype: document.mimetype,
        size: document.size,
        uploadedAt: document.uploadedAt,
        workspace: document.workspace,
      },
    });
  } catch (error) {
    console.error("Upload document error:", error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

// ------------------------------
// Get all documents (HR/Admin) or own documents (Employee)
// ------------------------------
export const getDocuments = async (req, res) => {
  try {
    // Employees only see their own files
    const filter = req.user.role === "employee" ? { uploadedBy: req.user._id } : {};

    const documents = await Document.find(filter)
      .sort({ uploadedAt: -1 })
      .populate("uploadedBy", "name email role"); // Optional: show uploader info

    res.json({ success: true, data: documents });
  } catch (error) {
    console.error("Get documents error:", error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};
