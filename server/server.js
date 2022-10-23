const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db.js");
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profile");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
