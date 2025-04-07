const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Server error. Could not fetch notifications.' });
  }
});

module.exports = router;