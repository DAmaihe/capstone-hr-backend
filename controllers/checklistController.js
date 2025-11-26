import Checklist from "../model/checklistModel.js";
import Task from "../model/taskModel.js";


const recalcTaskProgress = async (taskId) => {
  const items = await Checklist.find({ task: taskId });

  if (items.length === 0) {
    await Task.findByIdAndUpdate(taskId, { progress: 0 });
    return 0;
  }

  const completedCount = items.filter((i) => i.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);

  await Task.findByIdAndUpdate(taskId, { progress });

  return progress;
};

export const addChecklistItem = async (req, res) => {
  try {
    const { taskId, title, description } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const exists = await Checklist.findOne({ task: taskId, title });
    if (exists)
      return res.status(400).json({ message: "Checklist item already exists." });

    const item = await Checklist.create({
      task: taskId,
      title,
      description: description || "",
    });

    // Auto-update progress
    const progress = await recalcTaskProgress(taskId);

    res.status(201).json({
      success: true,
      message: "Checklist item added!",
      progress,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChecklistByTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const items = await Checklist.find({ task: taskId }).populate(
      "completedBy",
      "name email"
    );

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateChecklistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const item = await Checklist.findById(id);
    if (!item) return res.status(404).json({ message: "Checklist item not found" });

    if (req.user.role === "employee") {
      item.completed = completed;
      item.completedBy = completed ? req.user._id : null;
      item.completedAt = completed ? new Date() : null;
    } else {
      Object.assign(item, req.body);
    }

    await item.save();

    //Auto-update task progress
    const progress = await recalcTaskProgress(item.task);

    res.status(200).json({
      success: true,
      message: "Checklist updated!",
      progress,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteChecklistItem = async (req, res) => {
  try {
    const item = await Checklist.findById(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Checklist item not found" });

    const taskId = item.task;

    await item.deleteOne();

    //Auto-update task progress
    const progress = await recalcTaskProgress(taskId);

    res.status(200).json({
      success: true,
      message: "Checklist item deleted",
      progress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
