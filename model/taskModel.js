import mongoose from "mongoose";

//Subdocument schema for checklist 
const checklistSchema = new mongoose.Schema(
  {
        item: { type: String, required: true },
          completed: { type: Boolean, default: false },
  },
            { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
        title: {
          type: String,
            required: true,
    },
    description: {
        type: String,
    },
    assignedTo: {
       type: mongoose.Schema.Types.ObjectId,
         ref: "User",
           required: true,
    },
    status: {
       type: String,
         enum: ["Pending", "In-progress", "Completed"],
           default: "pending",
    },
    dueDate: {
       type: Date,
    },
  
    checklist: [checklistSchema],
  },
      { timestamps: true }
);

// Performance index
taskSchema.index({ assignedTo: 1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;
