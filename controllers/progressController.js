import Progress from "../model/progressModel.js";
import Task from "../model/taskModel.js"; 


export const addProgress = async (req, res) => {
  try {
       const { taskId, status, description, progressPercent } = req.body;

        // Use logged-in user
    const userId = req.user._id;

         const task = await Task.findById(taskId);
           if (!task) {
              return res.status(404).json({ success: false, message: "Task not found" });
    }   

    
        const progress = await Progress.create({
              task: taskId,
              user: userId,
              status: status || "In Progress",
              remarks: remarks || "No remarks provided",
              progressPercent: 0, 
     });

     if (progress.progressPercent === 0) task.status = "Pending";
    else if (progress.progressPercent >= 100) task.status = "Completed";
    else task.status = "In-progress";

    await task.save();
    

              res.status(201).json({
              success: true,
              message: "Progress added successfully!",
              data: progress,
     });

     } catch (error) {
            console.error("Add progress error:", error);
                res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
};

export const getProgressByTask = async (req, res) => {
  try {
       const { taskId } = req.params;

         const task = await Task.findById(taskId);
           if (!task) {
           return res.status(404).json({ success: false, message: "Task not found" });  
    }

         const progressEntries = await Progress.find({ task: taskId })
              .populate("updatedBy", "name email role department")
              .sort({ createdAt: 1 });

               res.status(200).json({
               success: true,
               task: task.title,
               progress: progressEntries,
    });

       } catch (error) {
               console.error("Get progress error:", error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};