import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema(
    {
       task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
         title: { type: String, required: true },
             completed: { type: Boolean, default: false },
    },
    
      { timestamps: true }
);

const Checklist = mongoose.model("Checklist", checklistSchema);
export default Checklist;
