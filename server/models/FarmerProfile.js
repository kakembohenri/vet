const mongoose = require("mongoose");

const schema = mongoose.Schema({
  farmer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  name: {
    type: [String],
  },
  location: {
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    },
  },

  farm_name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = FarmerProfile = mongoose.model("Farmer", schema);
