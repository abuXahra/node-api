// routes/notifications.js
const express = require("express");
const notificationController = require("../controller/notificationController");
const router = express.Router();

// Get unread notifications count
router.get("/unread", notificationController.getNotificationCount);

// Get all notifications for the admin
router.get("/", notificationController.getAllNotification);

// Mark a notification as read
router.put("/:id/read", notificationController.markNotificationUnread);

// Create a new notification (triggered by user/sub-admin action)
router.post("/", notificationController.createNotification);

module.exports = router;
