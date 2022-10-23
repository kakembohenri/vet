const mongoose = require("mongoose");

const schema = mongoose.Schema({
  farmer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  // names: {
  //   first_name: {
  //     type: String,
  //     required: true,
  //   },
  //   surname: {
  //     type: String,
  //     required: true,
  //   },
  //   other_name: {
  //     type: String,
  //   },
  // },
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
});

module.exports = FarmerProfile = mongoose.model("Farmer", schema);
