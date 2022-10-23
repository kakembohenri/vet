const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  contact: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date,
  },
});

module.exports = Codes = mongoose.model("Codes", schema);
