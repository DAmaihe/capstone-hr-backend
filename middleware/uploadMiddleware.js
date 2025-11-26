import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // folder where files will be stored
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// File filter (optional - only allow PDFs)
function fileFilter(req, file, cb) {
  const allowedTypes = ["application/pdf"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only PDF files are allowed"), false);
  }

  cb(null, true);
}

const upload = multer({ storage, fileFilter });

export default upload;
