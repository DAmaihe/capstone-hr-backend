import Checklist from "../Model/checklistModel.js";
import Task from "../Model/taskModel.js";

export const addChecklistItem = async (req, res) => {
  try {
         const { taskId, title } = req.body;

    // Verify task exists
           const task = await Task.findById(taskId);
                 if (!task) return res.status(404).json({ message: "Task not found" });

             const item = await Checklist.create({ task: taskId, title });

                    res.status(201).json({ success: true, message: "Checklist item added!", data: item });
  } catch (error) {
          res.status(500).json({ success: false, message: error.message });
  }
};

export const getChecklistByTask = async (req, res) => {
  try {
         const { taskId } = req.params;
           const items = await Checklist.find({ task: taskId });
                 res.status(200).json({ success: true, data: items });
  } catch (error) {
          res.status(500).json({ success: false, message: error.message });
  }
};

//Update a checklist item (mark completed)
export const updateChecklistItem = async (req, res) => {
  try {
       const { id } = req.params;
         const { completed } = req.body;

            const item = await Checklist.findByIdAndUpdate(
                  id,
                    { completed },
                       { new: true }
    );

                   if (!item) return res.status(404).json({ message: "Checklist item not found" });

                       res.status(200).json({ success: true, message: "Checklist updated!", data: item });
  } catch (error) {
          res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteChecklistItem = async (req, res) => {
  try {
         const { id } = req.params;
            const item = await Checklist.findByIdAndDelete(id);
                if (!item) return res.status(404).json({ message: "Checklist item not found" });

                   res.status(200).json({ success: true, message: "Checklist item deleted!" });
  } catch (error) {
          res.status(500).json({ success: false, message: error.message });
  }
};
