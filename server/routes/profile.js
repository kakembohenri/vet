const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const VetProfile = require("../models/VetProfile");
const FarmerProfile = require("../models/FarmerProfile");
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const Schedule = require("../models/Schedule");
const Calendar = require("../models/Calendar");
const Notifications = require("../models/Notifications");
const Reviews = require("../models/Reviews");
const Reports = require("../models/Reports");
const Suspended = require("../models/Suspended");

const bcrypt = require("bcrypt");

// Get profile
// Route    /profile
// Action GET

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user;

  try {
    const getVetProfile = await VetProfile.findOne({ vet: id });

    if (getVetProfile === null) {
      const getFarmerProfile = await FarmerProfile.findOne({ farmer: id });

      if (getFarmerProfile === null)
        return res.status(400).json({ msg: "This user doesnt exist" });

      // Get appointments created by current user
      const schedule = await Schedule.find({
        $or: [{ vet: id }, { farmer: id }],
      });

      const userContacts = await Users.findById(
        getFarmerProfile.farmer._id.toString()
      );

      let ban = null

      const isSuspended = await Suspended.findOne({user_id: getFarmerProfile.farmer._id.toString()})

      if(isSuspended === null){
        ban = false
      }else{
        ban = true
      }

      // Get notifications
      const notifications = await Notifications.find({
        reciever: user_id,
      });

      const newNotifications = notifications.filter(
        (item) => item.mark_as_read === false
      );

      return res.status(200).json({
        result: { ...getFarmerProfile, contact: userContacts.contact },
        schedule: schedule,
        notifications: newNotifications,
        reviews: [],
        isSuspended: ban
      });
    }

    // Get booked dates by current users
    const dates = await Calendar.find({ user: id });

    const userContacts = await Users.findById(getVetProfile.vet._id.toString());

    // Get appointments created by current user
    const schedule = await Schedule.find({
      $or: [{ vet: id }, { farmer: id }],
    });

    // Get notifications
    const notifications = await Notifications.find({ reciever: user_id });

    const newNotifications = notifications.filter(
      (item) => item.mark_as_read === false
    );

    let ban = null

    const isSuspended = await Suspended.findOne({user_id: user_id})

    if(isSuspended === null){
      ban = false
    }else{
      ban = true
    }


    // Get Reviews
    const reviews = await Reviews.find({ vet: id });

    return res.status(200).json({
      result: { ...getVetProfile, contact: userContacts.contact },
      schedule: schedule.reverse(),
      bookedDates: dates.reverse(),
      notifications: newNotifications.reverse(),
      reviews: reviews,
      isSuspended: ban
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get vet profile
// Route    /profile/vet/:id
// Action   GET
router.get("/vet/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getVetProfile = await VetProfile.findOne({ vet: id });

    if (!getVetProfile)
      return res.status(401).json({ msg: "Vet doesnt exist" });

    const userContacts = await Users.findById(getVetProfile.vet._id.toString());

    // Get booked dates by current users
    const dates = await Calendar.find({ user: id });

    // Get appointments created by current user
    const schedule = await Schedule.find({
      $or: [{ vet: id }, { farmer: id }],
    });
    res.status(200).json({
      result: { ...getVetProfile, contact: userContacts.contact },
      schedule: schedule,
      bookedDates: dates,
    });
  } catch (error) {
    res.status(200).json({ msg: "Server Error" });
  }
});

// Get searched vet
// Route  /profile/vet/:name
// Action   GET
router.get("/search/vet/:query", async (req, res) => {
  const { query } = req.params;

  let arr = []
  try {
    // Vets
    const vets = await VetProfile.find({
      name: { $regex: query, $options: "i" },
    });

    vets.map(async (item) => {
      // Get reviews
      const reviews = await Reviews.find({ vet: item.vet }).count();

      // Get schedules
      const schedules = await Schedule.find({ vet: item.vet });

      // Get reports
      const reports = await Reports.find({ reported: item.vet });

      let results = {
        vet: item,
        reviews: reviews,
        schedules: schedules,
        reports: reports,
      };
      
      return res.status(200).json({ vet: results });
    });
    
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Get services
// Route    /search/:query
// Action   get
router.get("/search/:query", auth, async (req, res) => {
  const { query } = req.params;
  const id = req.user;
  let user = "";
  let newServices = {};
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

    const services = await VetProfile.find({
      services: { $regex: query, $options: "i" },
    });

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
      return res.status(200).json({ result: [] });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//  Get Users to chat with
// Route    /inbox/search/:name
// Action   GET

router.get("/inbox/search/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const vet = await VetProfile.find({
      name: { $regex: name, $options: "i" },
    });

    const farmer = await FarmerProfile.find({
      name: { $regex: name, $options: "i" },
    });

    res.status(200).json({ result: [...vet, ...farmer] });
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

// Schedule appointment for

router.get("/schedule/create/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const getUserFarmer = await FarmerProfile.findOne({ farmer: id });

    // console.log("farmer", getUserFarmer);
    if (getUserFarmer === null) {
      const getUserVet = await VetProfile.findOne({ vet: id });

      if (getUserVet === null)
        return res.status(400).json({ msg: "User doesnt exist" });

      res.status(200).json({ result: getUserVet });
    }

    res.status(200).json({ result: getUserFarmer });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Retrieve chats with user

router.get("/chats/:currentUser/:otherUser", async (req, res) => {
  const { currentUser, otherUser } = req.params;


  try {
    const chats = await Messages.find({
      $or: [
        {$and: [
          { sender: currentUser },
          { reciever: otherUser },
        ]},
        {$and :[
          { sender: otherUser },
          { reciever: currentUser },
          
        ]}
      ],
    });

    const vet = await VetProfile.findOne({ vet: otherUser });

    if (vet === null) {
      const farmer = await FarmerProfile.findOne({ farmer: otherUser });

      return res.status(200).json({ result: chats, user: farmer });
    }
    return res.status(200).json({ result: chats, user: vet });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Send message
router.post("/send/to/:otherUser/from/:currentUser", async (req, res) => {
  const { otherUser, currentUser } = req.params;
  const { message } = req.body;

  try {
    const newChat = await Messages.create({
      sender: currentUser,
      reciever: otherUser,
      body: message,
    });

    // Get senders profile
    const vet = await VetProfile.findOne({ vet: currentUser });
    if (vet === null) {
      const farmer = await FarmerProfile.findOne({ farmer: currentUser });
      let sender = {
        user: currentUser,
        avatar: "",
        name: [
          farmer.name[0],
          farmer.name[1],
          farmer.name[2],
        ],
      };
      await Notifications.create({
        sender: sender,
        reciever: otherUser,
        subject: "chat",
      });
      return res.status(200).json({ result: newChat });
    }
    let sender = {
      user: currentUser,
      avatar: vet.profile_pic,
      name: vet.name,
    };
    await Notifications.create({
      sender: sender,
      reciever: otherUser,
      subject: "chat",
    });
    return res.status(200).json({ result: newChat });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get all chats

router.get("/retrive/chats/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allChats = await Messages.find({
      $or: [{ sender: id }, { reciever: id }],
    });

    // console.log(allChats);

    // Get all senders
    let senders = allChats.filter((item) => item.sender.toString() !== id);

    let sender_ids = senders.map((item) => item.sender.toString());

    let newSenderIds = sender_ids.filter(
      (item, index) => sender_ids.indexOf(item) === index
    );

    let senderVets = await VetProfile.find({ vet: { $in: newSenderIds } });

    let senderFarmers = await FarmerProfile.find({
      farmer: { $in: newSenderIds },
    });

    let recievers = allChats.filter((item) => item.reciever.toString() !== id);

    let reciever_ids = recievers.map((item) => item.reciever.toString());

    let newRecieverIds = reciever_ids.filter(
      (item, index) => reciever_ids.indexOf(item) === index
    );

    let recieverVets = await VetProfile.find({ vet: { $in: newRecieverIds } });

    let recieverFarmers = await FarmerProfile.find({
      farmer: { $in: newRecieverIds },
    });

    const chats = [
      ...senderFarmers,
      ...senderVets,
      ...recieverVets,
      ...recieverFarmers,
    ];

    // Remove duplicates

    let newArr = [];

    let a = chats.map((item) => JSON.stringify(item));

    a.filter((item, index) => a.indexOf(item) == index).map((item) => {
      newArr.push(JSON.parse(item));
    });

    // console.log(newArr);

    res.status(200).json({ result: newArr });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Route  /create/schedule/for/:id
router.post("/create/schedule/for/:farmer_id", auth, async (req, res) => {
  const { farmer_id } = req.params;
  const { agenda, date, time } = req.body;
  const id = req.user;
  try {
    const schedule = await Schedule.create({
      agenda: agenda,
      date: date,
      time: time,
      vet: id,
      farmer: farmer_id,
    });

    const vet = await VetProfile.findOne({ vet: id });

    let sender = {
      user: id,
      avatar: vet.profile_pic,
      name: vet.name,
    };

    await Notifications.create({
      sender: sender,
      reciever: farmer_id,
      subject: "appointment",
    });

    res.status(200).json({ result: schedule, id: id });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Book dates on calendar
router.post("/book/date", auth, async (req, res) => {
  const { date } = req.body;
  const user = req.user;

  try {
    const newDate = await Calendar.create({
      user: user,
      dates_booked: [date],
    });

    res.status(200).json({ result: newDate });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Remove booked date from calendar
router.delete("/date/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Calendar.findByIdAndDelete(id);

    return res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get schedule to edit
router.get("/edit/schedule/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getSchedule = await Schedule.findById(id);

    if (!getSchedule)
      return res.status(400).json({ msg: "Schedule wasnt found" });

    res.status(200).json({ result: getSchedule });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Edit schedule
router.patch("/edit/schedule/:id", auth, async (req, res) => {
  const { agenda, date, time } = req.body;
  const { id } = req.params;

  const user_id = req.user;

  try {
    const newSchedule = await Schedule.findByIdAndUpdate(
      id,
      { agenda: agenda, date: date, time: time },
      { new: true }
    );

    const vet = await VetProfile.findOne({ vet: user_id });

    let sender = {
      user: id,
      avatar: vet.profile_pic,
      name: vet.name,
    };

    await Notifications.create({
      sender: sender,
      reciever: newSchedule.farmer.toString(),
      subject: "edit",
    });

    res.status(200).json({ result: newSchedule.vet });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Complete schedule
router.patch("/complete/schedule/:id", auth, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user;
  try {
    const complete = await Schedule.findByIdAndUpdate(
      id,
      { status: "complete" },
      { new: true }
    );

    const vet = await VetProfile.findOne({ vet: user_id });

    let sender = {
      user: user_id,
      avatar: vet.profile_pic,
      name: vet.name,
    };

    await Notifications.create({
      sender: sender,
      reciever: complete.farmer.toString(),
      subject: "complete",
    });

    res.status(200).json({ result: complete });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Undo schedule status
router.patch("/undo/schedule/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const undo = await Schedule.findByIdAndUpdate(
      id,
      { status: "pending" },
      { new: true }
    );

    return res.status(200).json({ result: undo });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Cancel schedule
router.patch("/cancel/schedule/:id", auth, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user;

  try {
    const cancel = await Schedule.findByIdAndUpdate(
      id,
      { status: "cancel" },
      { new: true }
    );

    const vet = await VetProfile.findOne({ vet: user_id });

    if (vet === null) {
      const farmer = await FarmerProfile.findOne({ farmer: user_id });

      let sender = {
        user: user_id,
        avatar: farmer.profile_pic,
        name: farmer.name,
      };

      await Notifications.create({
        sender: sender,
        reciever: cancel.vet.toString(),
        subject: "cancel",
      });

      return res.status(200).json({ result: cancel });
    }

    let sender = {
      user: user_id,
      avatar: vet.profile_pic,
      name: vet.name,
    };

    await Notifications.create({
      sender: sender,
      reciever: cancel.farmer.toString(),
      subject: "cancel",
    });

    return res.status(200).json({ result: cancel });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get user to rate
router.get("/review/get-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getVetProfile = await VetProfile.findOne({ vet: id });

    res.status(200).json({ result: getVetProfile });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});
// Review experience
router.post("/review/vet/:vet_id", auth, async (req, res) => {
  const { vet_id } = req.params;
  const { notification } = req.params;
  const current_user = req.user;
  const { text, rating } = req.body;

  try {
    // add rating to vet
    const vet = await VetProfile.findById(vet_id);

    const farmer = await FarmerProfile.findOne({ farmer: current_user });

    let NewRating = "";

    if (vet.rating !== 0) {
      NewRating = (Number(vet.rating) + Number(rating)) / 2;
    } else {
      NewRating = rating;
    }

    const ratedVet = await VetProfile.findByIdAndUpdate(
      vet_id,
      { rating: NewRating },
      { new: true }
    );

    let sender = {
      user: current_user,
      avatar: farmer.profile_pic,
      name: [
        farmer.names.first_name,
        farmer.names.surname,
        farmer.names.other_name,
      ],
    };

    await Notifications.create({
      sender: sender,
      reciever: ratedVet.vet,
      subject: "rate",
    });

    await Notifications.findByIdAndDelete(notification);

    await Reviews.create({
      farmer: current_user,
      vet: ratedVet.vet,
      text: text,
      rating: rating,
    });

    res.status(200).json({ msg: "Successfully rated user", id: current_user });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Mark as read
router.patch("/notification/mark-as-read/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Notifications.findByIdAndUpdate(
      id,
      { mark_as_read: true },
      { new: true }
    );

    return res.status(200).json({ msg: "Notification marked as read", id: id });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Report user
router.post("/report/user/:user", auth, async (req, res) => {
  const reporter = req.user;
  const { user } = req.params;
  const { text } = req.body;

  try {
    await Reports.create({
      reported: user,
      reported_by: reporter,
      body: text,
    });
    res.status(200).json({
      msg: "Your report has been recieved and an investigation shall be made right away",
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Edit profile farmer
router.patch("/edit/farmer", auth, async (req, res) => {
  const formData = req.body;
  const farmer = req.user;

  let contact = [
    {
      phone_number: formData.phone_number,
      email: "",
    },
  ];

  let name = [
    formData.name.first_name,
    formData.name.surname,
    formData.name.last_name,
  ];

  delete formData["phone_number"];

  formData.name = name;
  try {
    const user = await Users.findByIdAndUpdate(
      farmer,
      { contact: contact },
      { new: true }
    );

    const userProfile = await FarmerProfile.findOneAndUpdate(
      { farmer: farmer },
      { $set: formData },
      { new: true }
    );

    return res.status(200).json({
      msg: "Successfully updated profile",
      id: farmer,
      result: { ...userProfile, contact: user.contact },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Edit vet
router.patch("/edit/vet", auth, async (req, res) => {
  const formData = req.body;
  const vet = req.user;

  let contact = [
    {
      phone_number: "",
      email: formData.email,
    },
  ];

  let name = [
    formData.name.first_name,
    formData.name.surname,
    formData.name.last_name,
  ];

  delete formData["email"];

  formData.name = name;
  try {
    const user = await Users.findByIdAndUpdate(
      vet,
      { contact: contact },
      { new: true }
    );

    const userProfile = await VetProfile.findOneAndUpdate(
      { vet: vet },
      { $set: formData },
      { new: true }
    );

    return res.status(200).json({
      msg: "Successfully updated profile",
      id: vet,
      result: { ...userProfile, contact: user.contact },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Change password
router.patch("/password/change", auth, async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const id = req.user;
  try {
    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .json({ msg: "Passwords dont match", type: "error" });

    const user = await Users.findById(id);

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid Password", type: "error" });

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await Users.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Password changed successfully", type: "success", id: id });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Edit profile vet
router.patch("/edit/vet", auth, async (req, res) => {
  const formData = req.body;
  const vet = req.user;

  let contact = [
    {
      email: formData.email,
    },
  ];

  delete formData["email"];

  let name = [
    formData.name.first_name,
    formData.name.surname,
    formData.name.last_name,
  ];

  delete formData["name"];
  try {
    await Users.findByIdAndUpdate(
      farmer,
      { contact: contact[0].email },
      { new: true }
    );

    await VetProfile.findOneAndUpdate(
      { vet: vet },
      { name: name },
      { $set: formData },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Successfully updated profile", id: vet });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Verify user account
router.patch("/admin/verify/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await VetProfile.findOneAndUpdate(
      { vet: id },
      { isVerified: true },
      { new: true }
    );

    return res.status(200).json({ msg: "Successfully verified account" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Investigate
router.get("/fetch/user/reports/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reports = await Reports.find({ reported: id });

    const vet = await VetProfile.findOne({ vet: id });

    return res.status(200).json({
      result: {
        reports: reports,
        name: vet.name,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Get reports
router.get("/fetch/all-reports", async (req, res) => {
  let ban = null;
  try {
    const reports = await Reports.find();

    reports.forEach(async (item) => {
      const vet = await VetProfile.findOne({ vet: item.reported.toString() });

      const count = await Reports.find({
        reported: item.reported.toString(),
      }).count();

      const isSuspended = await Suspended.findOne({user_id: item.reported.toString()})

      if(isSuspended === null){
        ban = false
      }else{
        ban = true
      }

      return res.status(200).json({
        result: {
          vet: vet,
          reports: count,
          isBanned: ban
        },
      });
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Fetch suspended users
router.get("/fetch/suspended/users", async(req,res) => {
  try {
    const suspended = await Suspended.find()

    return res.status(200).json({result: suspended})
  } catch (error) {
    return res.status(500).json({msg: 'Server Error'})
  }
})

// Suspend user account
router.post("/suspend/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const vet = await VetProfile.findOne({ vet: id });

    await Suspended.create({
        user_id: id,
        avatar: vet.profile_pic,
        name: vet.name,
      
    });

    return res.status(200).json({ msg: "User account suspended" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Unsuspend user account
router.delete("/unsuspend/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Suspended.findOneAndDelete({
      user_id: id
    });

    return res.status(200).json({ msg: "Account has been unsuspended" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
