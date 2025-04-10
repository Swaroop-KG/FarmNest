const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.post('/', async (req, res) => {
  try {
    const { itemName, userName, category } = req.body;

    if (!itemName || !category || !userName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newNotification = new Notification({
      itemName,
      category,
      userName,
      
      date: new Date() // 👈 This ensures the current date is saved
    });

    await newNotification.save();

    res.status(201).json({ message: 'Request sent successfully!' });
  } catch (err) {
    console.error('Error saving request:', err);
    res.status(500).json({ message: 'Server error. Could not send request.' });
  }
});



router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 }); // recent first
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Failed to fetch notifications.' });
  }
});



module.exports = router;
