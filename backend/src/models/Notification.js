const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' }, // optional
   // optional
  itemName: String,
  category: String,
  userName: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

module.exports = Notification;

