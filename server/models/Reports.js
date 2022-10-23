const mongoose = require("mongoose");
const SchemaTypes = mongoose.SchemaTypes;

const schema = mongoose.Schema({
  reported: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  reported_by: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Reports = mongoose.model("Reports", schema);
