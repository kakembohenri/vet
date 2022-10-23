const mongoose = require("mongoose");
const SchemaTypes = mongoose.SchemaTypes;

const schema = mongoose.Schema({
   user_id: {
      type: SchemaTypes.ObjectId,
    },
    avatar: {
      type: String,
    },
    name: {
      type: [String],
    },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Suspended = mongoose.model("Suspended", schema);
