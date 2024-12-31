const Notification = require("../models/Notification");

// Get unread notifications count
exports.getNotificationCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({ isRead: false });
    res.json({ count: unreadCount });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching unread notifications count" });
  }
};

// Get all notifications for the admin
exports.getAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

// Mark a notification as read
exports.markNotificationUnread = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Error marking notification as read" });
  }
};

// Create a new notification (triggered by user/sub-admin action)
exports.createNotification = async (req, res) => {
  const { userId, actionType, message } = req.body;
  try {
    const newNotification = new Notification({ userId, actionType, message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: "Error creating notification" });
  }
};
