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
const Suspended  = require('../models/Suspended')
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

      
    let ban = null

    const isSuspended = await Suspended.findOne({user_id: id})

    if(isSuspended === null){
      ban = false
    }else{
      ban = true
    }


      return res.status(200).json({
        result: { ...userProfile, contact: isWithPhoneNumber.contact },
        token,
        isSuspended: ban
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

      let ban = null

      const isSuspended = await Suspended.findOne({user_id: id})
  
      if(isSuspended === null){
        ban = false
      }else{
        ban = true
      }

      return res.status(200).json({
        result: { ...userProfile, contact: isWithEmail.contact },
        token,
        isSuspended: ban
      });
    } else if (isWithEmail.user === "admin") {
      const appointments = await Schedule.find();

      const vets = await VetProfile.find().count(); 

      const farmers = await FarmerProfile.find().count();

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
  const { phone_number, password, confirmPassword } = req.body;
  try {
    const existingUser = await Users.find({
      contact: {
        $elemMatch: {
          phone_number: phone_number,
        },
      },
    });
    // if (existingUser.length > 0)
    //   return res.status(400).json({ msg: "Phone number is already in use" });

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

    const token = jwt.sign(
      { id: result._id.toString() },
      "ivet"
    );

    delete result["password"];

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Send sms code
// Route    /verification-code/farmer
// Action   POST
router.post("/verification-code/farmer", async (req, res) => {
  const { phone_number, code } = req.body;

  const ug_code = "+256";
  const new_no = `${ug_code}${phone_number.slice(1)}`;

  try {

    await client.messages.create({
      body: `Your verification code is: ${code}`,
      from: "+18654019064",
      to: new_no,
    });


    // get user id using phone number
    const user = await Users.findOne({
      contact: {
        $elemMatch: {
          phone_number: phone_number
        },
      }
    })

    await Codes.create({
      user: user._id.toString(),
      contact: phone_number,
      code: code,
    });

    res.status(200).json({ msg: "Code has been sent successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Verify sms code
// Route  /verify-farmer
// Action   POST
router.post("/verify-farmer", auth, async (req, res) => {
  const { code } = req.body;
  try {
    let id = req.user;

    const existingCode = await Codes.findOne({ code });
    if (!existingCode) return res.status(400).json({ msg: "Invalid code" });

    await Codes.deleteOne({ codes: code });

    const verifiedUser = await Users.findByIdAndUpdate(id, {
      isVerified: true,
    });

    res.status(200).json({ result: verifiedUser });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//  Create farmer profile
// Route  /create-profile/farmer
// Action POST
router.post("/create-profile/farmer", auth, async (req, res) => {
  const { names, location, farm_name, bio } = req.body;

  let name = [names.surname, names.first_name, names.last_name]

let formData = {
  farmer: req.user,
  name: name,
  location: location,
  farm_name: farm_name,
  bio: bio
}


  try {
    const result = await FarmerProfile.create({
     formData
    });

    res.status(200).json({ result });
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

    let code = Math.floor(Math.random() * 100000);
    await Codes.create({
      contact: email,
      code: code,
    });

    // Sending email
    var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "familytree733@gmail.com",
        pass: "uhdfhzhuqqioglvw",
      },
    });

    const message = {
      from: "familytree733@gmail.com", // Sender address
      to: email, // List of recipients
      subject: "Verification email", // Subject line
      html: `<div style='display: flex; flex-direction: column;'><h3 style='font-family: Tahoma, sans-serif;'>!Vet is proud have a new member</h3><h4></h4><a style='font-family: Tahoma, sans-serif; color: #454545;' target='_blank' href=http://localhost:3000/vet/confirm/${email}/${code}/${id}>Click here to verify</a></div>`, // Plain text body
    };
    transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    delete result["password"];

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Confirm email address
router.post("/create-profile/personal-details/vet", async (req, res) => {
  const { email, code, id } = req.body;

  try {

    const existingUser = await Codes.findOne({ contact: email, code: code });

    if (!existingUser)
      return res.status(401).json({
        msg: "No confirmation code was ever sent to this email address",
      });

    await Users.findByIdAndUpdate(id, { isVerified: true }, {
      new: true
    });

    res.status(200).json({ result: id });
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

  let name = [names.first_name, names.surname, names.other_name]

  // const formData = {
  //   vet: id,
  //     name: name,
  //     clinic: clinic,
  //     location: location,
  //     services: services,
  //     experience: experience,
  //     profile_pic: profile_pic,
  //     contacts: contacts,
  // }

  // console.log("formData:", formData)
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

    const user = await Users.findById(id)

    const token = jwt.sign({ id: id }, "ivet");

    let contact = user.contact

    res.status(200).json({ msg: "Created successfully", result: {...result, contact: contact }, token, id:id });
  } catch (error) {
    res.status(500).json({error});
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

    const farmers = await FarmerProfile.find().count();

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
router.get("/fetch/vets", async(req, res) => {
  try {
    const result = await VetProfile.find()

    res.status(200).json({result});
  } catch (error) {
    return res.status(500).json({msg: 'Server Error'})
  }
})

module.exports = router;
