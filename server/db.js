const mongoose = require("mongoose");

const connectDB = async () => {
  let uri = "mongodb://127.0.0.1:27017/ivet";

  try {
    await mongoose.connect(uri);

    console.log("Mongoose connected ...");
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;