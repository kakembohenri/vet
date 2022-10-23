const mongoose = require("mongoose");
const SchemaTypes = mongoose.SchemaTypes;

const schema = mongoose.Schema({
  sender: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  reciever: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Messages = mongoose.model("Messages", schema);
