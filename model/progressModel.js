import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
      task: {
              type: mongoose.Schema.Types.ObjectId,
                    ref: "Task", // links this progress entry to a task
                        required: true,
    },
      description: {
                     type: String,
                          required: true, // details about the progress
    },
    updatedBy: {
                 type: mongoose.Schema.Types.ObjectId,
                     ref: "User", // who updated the progress
                         required: true,
    },
    status: {
              type: String,
                     enum: ["Pending", "In-progress", "Completed"], // matches task status
                          default: "Pending",
    },
    progressPercent: {
                          type: Number,
                                min: 0,
                                    max: 100,
                                          default: 0,
    },
  },
      { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
