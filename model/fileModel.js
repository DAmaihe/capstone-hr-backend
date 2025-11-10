import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
                       originalname: String,
                       filename: String,
                       path: String,
                       mimetype: String,
                       size: Number,
      uploadedBy: {
                     type: mongoose.Schema.Types.ObjectId,
      ref: "User", //link file to a user
      required: true
  },
      uploadDate: {
                         type: Date,
      default: Date.now,
  },
});

export default mongoose.model("File", fileSchema);
