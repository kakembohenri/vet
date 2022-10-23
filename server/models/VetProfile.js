const mongoose = require("mongoose");

const schema = mongoose.Schema({
  vet: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  name: {
    type: [String],
  },
  rating: {
    type: Number,
    default: 0,
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
    default: false,
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = VetProfile = mongoose.model("VetProfile", schema);
