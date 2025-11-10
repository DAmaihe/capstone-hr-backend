import Event from "../model/eventModel.js";

//(HR/Admin only)
export const createEvent = async (req, res) => {
  try {
    const event = new Event({ ...req.body, createdBy: req.user._id });
    await event.save();
    res.status(201).json({ success: true, message: "Event created!", event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//(HR + Employees)
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//(HR/Admin only)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event updated", event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//(HR/Admin only)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
