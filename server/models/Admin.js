const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  names: [
    {
      first_name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      other_name: {
        type: String,
      },
    },
  ],
  priviledge: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    required: true,
  },
});

module.exports = AdminProfile = mongoose.model("AdminProfile", schema);
