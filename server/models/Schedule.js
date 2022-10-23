const mongoose = require("mongoose");
const SchemaTypes = mongoose.SchemaTypes;

const schema = mongoose.Schema({
  agenda: {
    type: String,
    required: true,
  },
  rating:{
    type: Number
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  vet: {
    type: SchemaTypes.ObjectId,
  },
  farmer: {
    type: SchemaTypes.ObjectId,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = Schedule = mongoose.model("Schedule", schema);
