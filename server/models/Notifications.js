const mongoose = require("mongoose");

const schema = mongoose.Schema({
  sender: {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    avatar: {
      type: String,
    },
    name: {
      type: [String],
    },
  },
  reciever: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  subject: {
    type: String,
  },
  mark_as_read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Notifications = mongoose.model("Notifications", schema);
