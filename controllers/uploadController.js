import Document from "../model/documentModel.js";

/**
 * ==========================================
 * EMPLOYEE — Upload Document
 * ==========================================
 */
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    if (!req.body.documentType) {
      return res.status(400).json({
        success: false,
        message: "Document type is required.",
      });
    }

    const document = await Document.create({
      documentType: req.body.documentType,
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user._id,
      workspace: req.user.workspace || null,
      status: "Pending Review",
    });

    const fileUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: {
        id: document._id,
        documentType: document.documentType,
        originalName: document.originalName,
        fileUrl,
        size: document.size,
        status: document.status,
        uploadedAt: document.createdAt,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};


/**
 * ==========================================
 * GET DOCUMENTS
 * ==========================================
 */
export const getDocuments = async (req, res) => {
  try {
    const filter =
      req.user.role === "employee"
        ? { uploadedBy: req.user._id }
        : {};

    const documents = await Document.find(filter)
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "name email role");

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    console.error("Get documents error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};


/**
 * ==========================================
 * HR — Review Document
 * ==========================================
 */
export const reviewDocument = async (req, res) => {
  try {
    if (req.user.role === "employee") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    document.status = status;
    document.reviewedBy = req.user._id;
    document.reviewedAt = new Date();

    await document.save();

    res.status(200).json({
      success: true,
      message: `Document ${status} successfully`,
      data: document,
    });
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};
