import Message from "../model/messageModel.js";

// ✅ Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { recipient, content } = req.body;
    const message = new Message({
      sender: req.user._id,
      recipient,
      content,
    });
    await message.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: message,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all messages for logged-in user
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { recipient: req.user._id }],
    })
      .populate("sender", "name email role")
      .populate("recipient", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get unread messages count
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });

    res.status(200).json({ success: true, unreadCount: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, message: "Marked as read", data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
