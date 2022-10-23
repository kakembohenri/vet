const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
const accountSid = "AC5acd6beb916fade67a99052c54926340";
const authToken = "a0ca4f42c1ccea44a30a1045accd4b6c";

const client = require("twilio")(accountSid, authToken);

//Modles
const Users = require("../models/Users");
const Schedule = require("../models/Schedule");
const Codes = require("../models/Codes");
const FarmerProfile = require("../models/FarmerProfile");
const VetProfile = require("../models/VetProfile");
const Suspended = require("../models/Suspended");
const router = express.Router();

// Signin
// Route  /signin
// Action   POST
router.post("/login", async (req, res) => {
  const { contact, password } = req.body;
  try {
    if (contact === "" || password === "")
      return res.status(400).json({ msg: "Fill in both fields" });
    const isWithEmail = await Users.findOne({
      contact: {
        $elemMatch: {
          email: contact,
        },
      },
    });

    if (isWithEmail === null) {
      const isWithPhoneNumber = await Users.findOne({
        contact: {
          $elemMatch: {
            phone_number: contact,
          },
        },
      });

      if (isWithPhoneNumber === null)
        return res.status(400).json({ msg: "User doesnt exist" });

      if (!isWithPhoneNumber.isVerified)
        return res
          .status(404)
          .json({ msg: "You need to verify your account first" });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        isWithPhoneNumber.password
      );

      if (!isPasswordCorrect)
        return res.status(400).json({ msg: "Invalid credentials" });

      let id = isWithPhoneNumber._id.toString();

      const userProfile = await FarmerProfile.findOne({ farmer: id });

      const token = jwt.sign({ id: id }, "ivet");

      let ban = null;

      const isSuspended = await Suspended.findOne({ user_id: id });

      if (isSuspended === null) {
        ban = false;
      } else {
        ban = true;
      }

      return res.status(200).json({
        result: { ...userProfile, contact: isWithPhoneNumber.contact },
        token,
        isSuspended: ban,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isWithEmail.password
    );
    let id = isWithEmail._id.toString();

    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: id }, "ivet");

    const userProfile = await VetProfile.findOne({ vet: id });

    if (userProfile !== null) {
      let ban = null;

      const isSuspended = await Suspended.findOne({ user_id: id });

      if (isSuspended === null) {
        ban = false;
      } else {
        ban = true;
      }

      return res.status(200).json({
        result: { ...userProfile, contact: isWithEmail.contact },
        token,
        isSuspended: ban,
      });
    } else if (isWithEmail.user === "admin") {
      const appointments = await Schedule.find();

      const vets = await VetProfile.find().count();

      const farmers = await FarmerProfile.find();

      const admins = await Users.find({ user: "admin" });

      return res.status(200).json({
        user: "admin",
        token: token,
        result: {
          appointments: appointments,
          vets: vets,
          farmers: farmers,
          admins: admins,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Signup Farmer
// Route    /signup/farmer
// Action   POST
router.post("/signup/farmer", async (req, res) => {
  const { phone_number, password, confirmPassword, code } = req.body;
  try {
    const existingUser = await Users.find({
      contact: {
        $elemMatch: {
          phone_number: phone_number,
        },
      },
    });
    if (existingUser.length > 0)
      return res.status(400).json({ msg: "Phone number is already in use" });

    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      user: "farmer",
      contact: [
        {
          phone_number: phone_number,
          email: "",
        },
      ],
      password: hashedPassword,
    });

    let id = result._id.toString();

    // Create code
    await Codes.create({
      user: id,
      contact: phone_number,
      code: code,
    });

    delete result["password"];

    res
      .status(200)
      .json({ result: result, msg: "Code has been sent successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Verify sms code
// Route  /verify-farmer
// Action   POST
router.post("/verify-farmer", async (req, res) => {
  const { phone_number, code } = req.body;
  try {
    const existingCode = await Codes.findOne({
      code: code,
      contact: phone_number,
    });

    if (!existingCode) return res.status(400).json({ msg: "Invalid code" });

    let id = existingCode.user.toString();

    return res.status(200).json({ result: id });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//  Create farmer profile
// Route  /create-profile/farmer
// Action POST
router.post("/create-profile/farmer", async (req, res) => {
  const { farmer, names, location, farm_name, bio, profile_pic } = req.body;

  let name = [names.surname, names.first_name, names.last_name];

  try {
    const result = await FarmerProfile.create({
      farmer: farmer,
      name: name,
      location: location,
      farm_name: farm_name,
      bio: bio,
      profile_pic: profile_pic,
    });

    const user = await Users.findById(farmer);

    // Verify user
    await Users.findByIdAndUpdate(farmer, { isVerified: true });

    const token = jwt.sign({ id: farmer }, "ivet");

    let contact = user.contact;

    res.status(200).json({
      msg: "Farmer profile created successfully",
      result: { ...result, contact: contact },
      token,
      id: farmer,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Send Vet email
// Route /verify-vet
// Action POST
router.post("/signup/vet", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  try {
    const existingUser = await Users.find({
      contact: {
        $elemMatch: {
          email: email,
        },
      },
    });

    if (existingUser.length > 0)
      return res.status(400).json({ msg: "User already exists" });

    if (password !== passwordConfirm)
      return res.status(400).json({ msg: "Passwords do not match" });

    let code = Math.floor(Math.random() * 100000);

    // Sending email
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "familytree733@gmail.com",
        pass: "uhdfhzhuqqioglvw",
      },
    });

    const message = {
      from: "familytree733@gmail.com", // Sender address
      to: email, // List of recipients
      subject: "Verification email", // Subject line
      html: `<div style='display: flex; flex-direction: column;'><h3 style='font-family: Tahoma, sans-serif;'>!Vet is proud have a new member</h3><h4></h4><a style='font-family: Tahoma, sans-serif; color: #454545;' target='_blank' href=http://localhost:3000/vet/confirm/${email}/${code}>Click here to verify</a></div>`, // Plain text body
    };
    transport.sendMail(message, async function (err, info) {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "Couldnt send email. Please try again" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await Users.create({
          user: "vet",
          contact: [
            {
              phone_number: "",
              email: email,
            },
          ],
          password: hashedPassword,
        });

        let id = result._id.toString();

        // Create a code
        await Codes.create({
          user: id,
          contact: email,
          code: code,
        });
        console.log(info);
        delete result["password"];
        return res.status(200).json({ result: result });
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Confirm email address
router.post("/create-profile/personal-details/vet", async (req, res) => {
  const { email, code } = req.body;

  try {
    const existingUser = await Codes.findOne({ contact: email, code: code });

    if (!existingUser)
      return res.status(401).json({
        msg: "No confirmation code was ever sent to this email address",
      });

    let id = existingUser.user.toString();
    return res
      .status(200)
      .json({ result: id, msg: "Proceed with creating your profile" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Create profile for vet
router.post("/create-profile/contacts/vet", async (req, res) => {
  const {
    id,
    names,
    location,
    services,
    profile_pic,
    clinic,
    experience,
    contacts,
  } = req.body;

  let name = [names.first_name, names.surname, names.other_name];

  try {
    const result = await VetProfile.create({
      vet: id,
      name: name,
      clinic: clinic,
      location: location,
      services: services,
      experience: experience,
      profile_pic: profile_pic,
      contacts: contacts,
    });

    const user = await Users.findById(id);

    // Verify user
    await Users.findByIdAndUpdate(id, { isVerified: true });

    const token = jwt.sign({ id: id }, "ivet");

    let contact = user.contact;

    res.status(200).json({
      msg: "Vet profile created successfully",
      result: { ...result, contact: contact },
      token,
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Create a new admin user
// Route    /create/admin
router.post("/create/admin", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  try {
    const existingUser = await Users.findOne({
      contact: {
        $elemMatch: {
          email: email,
        },
      },
    });

    if (existingUser !== null)
      return res.status(400).json({ msg: "User already exists" });

    if (password !== passwordConfirm)
      return res.status(400).json({ msg: "Passwords dont match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    await Users.create({
      user: "admin",
      contact: [
        {
          email: email,
          phone_number: "",
        },
      ],
      isVerified: true,
      password: hashedPassword,
    });

    res.status(200).json({ msg: "New admin created" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Fetch admin dashboard
router.get("/dashboard/fetch", async (res) => {
  try {
    const appointments = await Schedule.find();

    const vets = await VetProfile.find().count();

    const farmers = await FarmerProfile.find();

    res.status(200).json({
      appointments: appointments,
      vets: vets,
      farmers: farmers,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Fetch vets
router.get("/fetch/vets", async (req, res) => {
  try {
    const result = await VetProfile.find();

    res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Fetch vets by service
router.get("/category/services/:name", auth, async (req, res) => {
  const { name } = req.params;
  const id = req.user;
  let user = "";
  let result = [];
  let finalServices = [];

  try {
    // Get user profile
    const userType = await Users.findById(id);

    // console.log(userType);
    if (userType.user === "vet") {
      const vet = await VetProfile.findOne({ vet: id });
      user = vet;
    } else if (userType.user === "farmer") {
      const farmer = await FarmerProfile.findOne({ farmer: id });
      user = farmer;
    }

    const services = await VetProfile.find({ services: { $in: name } });

    if (services.length > 0) {
      services.map((item) => {
        lon1 = (user.location.coordinates.longitude * Math.PI) / 180;
        lon2 = (item.location.coordinates.longitude * Math.PI) / 180;
        lat1 = (user.location.coordinates.latitude * Math.PI) / 180;
        lat2 = (item.location.coordinates.latitude * Math.PI) / 180;

        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;

        let a =
          Math.pow(Math.sin(dlat / 2), 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

        let c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth in Kilometers
        let r = 3956;

        let service = { ...item, distance: c * r };

        finalServices.push({ service });
      });

      return res.status(200).json({ result: finalServices });
    } else {
      return res.status(200).json({ result: result });
    }

    // res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
