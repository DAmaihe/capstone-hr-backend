import User from "../model/userModel.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Employee already exists" });

    const newUser = new User({
      name,
      email,
      password,
      department,
      role: "employee",
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeDetails = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select("-password");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
