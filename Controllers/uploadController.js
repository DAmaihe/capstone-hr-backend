import multer from "multer";
import path from "path";
import File from "../model/fileModel.js";


const storage = multer.diskStorage({
     destination: (req, file, cb) => {
     cb(null, "uploads/"); 
  },
     filename: (req, file, cb) => {
     cb(null, Date.now() + path.extname(file.originalname)); // Special name
  },
});

const fileFilter = (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "text/plain"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
  } else {
            cb(new Error("Invalid file type. Only JPEG, PNG, PDF, and TXT allowed."));
  }  
};

export const upload = multer({ storage, fileFilter });

//Upload Controller
export const uploadFile = async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    // Use logged-in user from JWT
    const uploadedBy = req.user._id;

    // Save file info to MongoDB
    const savedFile = await File.create({
          originalname: req.file.originalname,
          filename: req.file.filename,
          path: req.file.path,
          mimetype: req.file.mimetype,
          size: req.file.size,
          uploadedBy,
    });

          res.status(200).json({
          success: true,
          message: "File uploaded and saved to database successfully!",
          file: savedFile,
    });

  } catch (error) {
          res.status(500).json({ success: false, message: error.message });
  }
};
