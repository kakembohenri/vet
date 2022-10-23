import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${localStorage.getItem("user")}`;
  }

  return req;
});

// User sign in
export const signIn = (formData) => API.post("/user/login", formData);

// Signup as a farmer
export const signupFarmer = (formData) =>
  API.post("/user/signup/farmer", formData);

// Send code
export const sendCode = (phone_number, code) =>
  API.post("/user/verification-code/farmer", { phone_number, code });

// Verify code
export const verifyCode = (code) => API.post("/user/verify-farmer", { code });

// Verify account by admin
export const adminVerify = (id) => API.patch(`/profile/admin/verify/${id}`);

// Create a Farmer profile
export const createFarmerProfile = (formData) =>
  API.post("/user/create-profile/farmer", formData);

// Send vet Email
export const signupVet = (formData) => API.post("/user/signup/vet", formData);

// Create a Vet profile
export const createVetProfile = (formData) =>
  API.post("/user/create-profile/vet", formData);

// Confirm email address for vet
export const confirmEmail = (email, code, id) =>
  API.post("/user/create-profile/personal-details/vet", { email, code, id });

// Send vet profile contacts
export const addVetContacts = (newFormData) =>
  API.post("/user/create-profile/contacts/vet", newFormData);

// Get profile
export const getProfile = (id) => API.get(`/profile/${id}`);

export const getVetProfile = (id) => API.get(`/profile/vet/${id}`);

// Edit profile farmer
export const editProfileFarmer = (formData) =>
  API.patch(`/profile/edit/farmer`, formData);

// Change password
export const changePassword = (passwords) =>
  API.patch(`/profile/password/change`, passwords);

// Edit profile vet
export const editProfileVet = (formData) =>
  API.patch(`/profile/edit/vet`, formData);

// Search for vet services
export const searchServices = (query) => API.get(`/profile/search/${query}`);

// Search for vet
export const searchVets = (query) => API.get(`/profile/search/vet/${query}`);

// Search all users
export const searchUsers = (name) => API.get(`/profile/inbox/search/${name}`);

// Get user to schedule a meeting
export const scheduleUser = (id) => API.get(`/profile/schedule/create/${id}`);

// Retrieve chats with user
export const retrieveChats = (currentUser, otherUser) =>
  API.get(`/profile/chats/${currentUser}/${otherUser}`);

// Get user chatting with details
export const getUserDetails = (id) => API.get(`/profile/chats/get-user/${id}`);

// Retrieve all chats
export const getAllChats = (id) => API.get(`/profile/retrive/chats/${id}`);

// Send message
export const sendMessage = (currentUser, otherUser, message) =>
  API.post(`/profile/send/to/${otherUser}/from/${currentUser}`, { message });

// Create a schedule
export const createSchedule = (farmer_id, formData) =>
  API.post(`/profile/create/schedule/for/${farmer_id}`, formData);

// Book dates
export const bookDate = (date) => API.post(`/profile/book/date`, { date });

// Remove booked date
export const removeDate = (id) => API.delete(`/profile/date/${id}`);

// Get schedule to edit
export const getSchedule = (id) => API.get(`/profile/edit/schedule/${id}`);

// Edit schedule
export const editSchedule = (id, formData) =>
  API.patch(`/profile/edit/schedule/${id}`, formData);

// Complete schedule
export const completeSchedule = (id) =>
  API.patch(`/profile/complete/schedule/${id}`);

// Undo schedule status
export const undoSchedule = (id) => API.patch(`/profile/undo/schedule/${id}`);

// Cancel schedule
export const cancelSchedule = (id) =>
  API.patch(`/profile/cancel/schedule/${id}`);

// Review experience
export const reviewUser = (id, formData) =>
  API.post(`/profile/review/vet/${id}`, formData);

// Get unrated appointments
export const unratedAppointments = () =>
  API.get("/profile/unrated/appointments");

// Create admin
export const createAdmin = (formData) =>
  API.post("/user/create/admin", formData);

// Fetch dashboard
export const fetchDashboard = () => API.get("/user/dashboard/fetch");

// Get vet profile to review
export const getVetToRate = (id) => API.get(`/profile/review/get-user/${id}`);

// Rate a user
export const rateUser = (vet_id, formData) =>
  API.post(`/profile/review/vet/${vet_id}`, formData);

// Mark as read
export const MarkAsRead = (id) =>
  API.patch(`/profile/notification/mark-as-read/${id}`);

// Report a user
export const Report = (id, text) =>
  API.post(`/profile/report/user/${id}`, { text });

// Investigate user reports
export const userReports = (id) => API.get(`/profile/fetch/user/reports/${id}`);

// Get all reports
export const getReports = () => API.get("/profile/fetch/all-reports");

// Suspend user
export const suspendUser = (id) => API.post(`/profile/suspend/${id}`);

// Unsuspend user
export const unsuspendUser = (id) => API.delete(`/profile/unsuspend/${id}`);

// Get suspended users
export const suspendedUsers = () => API.get('/profile/fetch/suspended/users')

// Fetch vets
export const fetchVets = () => API.get(`/user/fetch/vets`)