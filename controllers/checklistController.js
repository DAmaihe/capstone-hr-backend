import Checklist from "../model/checklistModel.js";
import Task from "../model/taskModel.js";
import Progress from "../model/progressModel.js";

/**
 * HR — Create checklist template
 */
export const createChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.create({
      title: req.body.title,
      description: req.body.description,
      department: req.body.department || "All",
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, data: checklist });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create checklist",
    });
  }
};

/**
 * HR — Add task to checklist (template task)
 */
export const addTaskToChecklist = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      checklist: req.params.checklistId,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add task",
    });
  }
};

/**
 * HR — Assign checklist to employee
 */
export const assignChecklistToEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const { checklistId } = req.params;

    const checklist = await Checklist.findById(checklistId);
    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: "Checklist not found",
      });
    }

    const tasks = await Task.find({ checklist: checklistId });
    if (!tasks.length) {
      return res.status(400).json({
        success: false,
        message: "Checklist has no tasks",
      });
    }

    const alreadyAssigned = await Progress.findOne({
      employee: employeeId,
      checklist: checklistId,
    });

    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "Checklist already assigned to this employee",
      });
    }

    const progressDocs = tasks.map(task => ({
      employee: employeeId,
      checklist: checklistId,
      task: task._id,
      status: "pending",
    }));

    await Progress.insertMany(progressDocs);

    res.json({
      success: true,
      message: "Checklist assigned successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Assignment failed",
    });
  }
};

/**
 * HR — Get all checklist templates
 */
export const getAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find().sort({ createdAt: -1 });
    res.json({ success: true, data: checklists });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch checklists",
    });
  }
};

/**
 * HR — View all employees checklist progress
 */
export const getAllEmployeesChecklistProgress = async (req, res) => {
  if (!["hr", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "HR/Admin only" });
  }

  try {
    const progress = await Progress.find()
      .populate("employee", "name email role department")
      .populate("task", "title")
      .populate("checklist", "title");

    const report = {};

    progress.forEach(p => {
      const key = `${p.employee._id}-${p.checklist._id}`;

      if (!report[key]) {
        report[key] = {
          employee: p.employee,
          checklist: p.checklist,
          totalTasks: 0,
          completedTasks: 0,
        };
      }

      report[key].totalTasks += 1;

      if (p.status === "completed") {
        report[key].completedTasks += 1;
      }
    });

    const result = Object.values(report).map(r => ({
      employee: r.employee,
      checklist: r.checklist,
      totalTasks: r.totalTasks,
      completedTasks: r.completedTasks,
      completionPercentage: Math.round(
        (r.completedTasks / r.totalTasks) * 100
      ),
    }));

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate HR dashboard",
    });
  }
};


/**
 * EMPLOYEE — Get own checklist progress
 */
export const getEmployeeChecklist = async (req, res) => {
  try {
    const progress = await Progress.find({ employee: req.user._id })
      .populate("task")
      .populate("checklist");

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load checklist",
    });
  }
};

/**
 * EMPLOYEE — Update own task progress
 */
export const updateTaskProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      _id: req.params.progressId,
      employee: req.user._id,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found",
      });
    }

    progress.status = req.body.status;
    await progress.save();

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update progress",
    });
  }
};
