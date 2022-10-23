const mongoose = require("mongoose");

const schema = mongoose.Schema({
  farmer: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  vet: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  text: {
    type: String,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Reviews = mongoose.model("Reviews", schema);
