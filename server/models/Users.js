const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  contact: [
    {
      email: {
        type: String,
      },
      phone_number: {
        type: String,
      },
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Users = mongoose.model("Users", schema);
