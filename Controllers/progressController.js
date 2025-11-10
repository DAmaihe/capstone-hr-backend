import Progress from "../model/progressModel.js";
import Task from "../model/taskModel.js"; 


export const addProgress = async (req, res) => {
  try {
       const { taskId, userId, status, remarks } = req.body;

         const task = await Task.findById(taskId);
           if (!task) {
             return res.status(404).json({ message: "Task not found" });
    }   

    
        const progress = await Progress.create({
              task: taskId,
              user: userId,
              status: status || "In Progress",
              remarks: remarks || "No remarks provided",
              progressPercent: 0, 
     });

              res.status(201).json({
              success: true,
              message: "Progress added successfully!",
              data: progress,
     });

     } catch (error) {
               res.status(500).json({ message: error.message });
    }
      };

export const getProgressByTask = async (req, res) => {
  try {
       const { taskId } = req.params;

         const task = await Task.findById(taskId);
           if (!task) {
             return res.status(404).json({ message: "Task not found" });
    }

         const progressEntries = await Progress.find({ task: taskId })
              .populate("user", "name email role department"); 

               res.status(200).json({
               success: true,
               task: task.title,
               progress: progressEntries,
    });

       } catch (error) {
               res.status(500).json({ message: error.message });
  }
};