const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  dates_booked: {
    type: [String],
    required: true,
  },
});

module.exports = Calendar = mongoose.model("Calendar", schema);
