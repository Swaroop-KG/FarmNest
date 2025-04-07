const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.post('/', async (req, res) => {
  try {
    const { itemName, category, userId } = req.body;

    if (!itemName || !category || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newNotification = new Notification({
      itemName,
      category,
      userId,
      date: new Date() // 👈 This ensures the current date is saved
    });

    await newNotification.save();

    res.status(201).json({ message: 'Request sent successfully!' });
  } catch (err) {
    console.error('Error saving request:', err);
    res.status(500).json({ message: 'Server error. Could not send request.' });
  }
});

module.exports = router;
