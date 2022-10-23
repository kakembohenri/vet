const mongoose = require("mongoose");

const schema = mongoose.Schema({
  vet: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  // names: {
  //   first_name: {
  //     type: String,
  //   },
  //   surname: {
  //     type: String,
  //   },
  //   other_name: {
  //     type: String,
  //   },
  // },
  name: {
    type: [String],
  },
  rating: {
    type: Number,
    default: 0
  },
  clinic: {
    type: String,
    required: true,
  },
  location: {
    name: {
      type: String,
    },
    coordinates: {
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  services: {
    type: [String],
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    required: true,
  },
  contacts: {
    phone_number: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.SchemaTypes.ObjectId,
  //       ref: "FarmerProfile",
  //     },
  //     text: {
  //       type: String,
  //     },
  //     rating: {
  //       type: Number,
  //     },
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = VetProfile = mongoose.model("VetProfile", schema);
