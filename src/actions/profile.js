import {
  GET_PROFILE,
  SEARCH_SERVICES,
  SEARCH_USERS,
  SCHEDULE_FOR_USER,
  GET_CHAT,
  SEND_MESSAGE,
  GET_ALL_CHATS,
  CREATE_SCHEDULE,
  BOOK_DATE,
  EDIT_SCHEDULE,
  SCHEDULE_EDITED,
  COMPLETE_SCHEDULE,
  UNRATED_APPOINTMENTS,
  GET_VET_PROFILE,
  GET_USER_TO_RATE,
  RATE_USER,
  LOGOUT,
  MARK_AS_READ,
  REMOVE_DATE,
  SEARCH_VETS,
  UNDO_SCHEDULE,
  CANCEL_SCHEDULE,
  EDIT_PROFILE_FARMER,
  EDIT_PROFILE_VET,
  GET_REPORTS,
  INVESTIGATE,
  SUSPENDED_USERS,
  CLEAR_SEARCH
} from "../types";
import * as api from "../api/index";
import { setAlert } from "./alert";

// Fetch user profile
export const getprofile = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProfile(id);
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Logout
export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });

    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

export const getvetprofile = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.getVetProfile(id);

    dispatch({
      type: GET_VET_PROFILE,
      payload: data,
    });

    navigate(`/profile/${data.result._doc.vet.toString()}`);
  } catch (error) {
    console.log(error);
  }
};

// Search for services
export const searchservices = (query) => async (dispatch) => {
  try {
    const { data } = await api.searchServices(query);

    dispatch({
      type: SEARCH_SERVICES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Search for vet
export const searchvets = (query) => async (dispatch) => {
  try {
    const { data } = await api.searchVets(query);

    dispatch({
      type: SEARCH_VETS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Clear search
export const clearsearch = () =>async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_SEARCH
    })
  } catch (error) {
    console.log(error)
  }
}


// Search for users
export const searchusers = (name) => async (dispatch) => {
  try {
    const { data } = await api.searchUsers(name);

    dispatch({
      type: SEARCH_USERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get user to create schedule

export const scheduleuser = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.scheduleUser(id);

    dispatch({
      type: SCHEDULE_FOR_USER,
      payload: data,
    });

    if (data.result?.farmer) {
      navigate("/create/schedule");
    } else {
      navigate("/create/schedule");
    }
  } catch (error) {
    console.log(error);
  }
};

// Retrieve chats
export const retrievechats = (currentUser, otherUser) => async (dispatch) => {
  try {
    const { data } = await api.retrieveChats(currentUser, otherUser);

    dispatch({
      type: GET_CHAT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all chats
export const getallchats = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAllChats(id);

    dispatch({
      type: GET_ALL_CHATS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Send message
export const sendmessage =
  (currentUser, otherUser, message) => async (dispatch) => {
    try {
      const { data } = await api.sendMessage(currentUser, otherUser, message);

      dispatch({
        type: SEND_MESSAGE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

// Create a schedule
export const createschedule =
  (farmer_id, formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.createSchedule(farmer_id, formData);

      dispatch({
        type: CREATE_SCHEDULE,
        payload: data,
      });

      dispatch(setAlert("Appointment has been created", "success"));
      navigate(`/profile/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

// Book dates
export const bookdate = (date) => async (dispatch) => {
  try {
    const { data } = await api.bookDate(date);

    dispatch({
      type: BOOK_DATE,
      payload: data,
    });

    dispatch(setAlert("Date successfully booked", "success"));
  } catch (error) {
    console.log(error);
  }
};

// Remove booked date
export const removedate = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeDate(id);

    dispatch({
      type: REMOVE_DATE,
      payload: data,
    });

    dispatch(setAlert("Date has been unbooked", "success"));
  } catch (error) {
    console.log(error);
  }
};

// Get schedule to edit
export const getschedule = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSchedule(id);

    dispatch({
      type: EDIT_SCHEDULE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Edit schedule
export const editschedule = (id, formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.editSchedule(id, formData);

    dispatch({
      type: SCHEDULE_EDITED,
    });

    dispatch(setAlert("Appointment has been edited", "success"));

    navigate(`/profile/${data.result}`);
  } catch (error) {
    console.log(error);
  }
};

// Complete schedule
export const completeschedule = (id) => async (dispatch) => {
  try {
    const { data } = await api.completeSchedule(id);

    dispatch({
      type: COMPLETE_SCHEDULE,
      payload: data,
    });

    dispatch(setAlert("Appointment has been completed", "success"));
  } catch (error) {
    console.log(error);
  }
};

// Undo schedule
export const undoschedule = (id) => async (dispatch) => {
  try {
    const { data } = await api.undoSchedule(id);

    dispatch({
      type: UNDO_SCHEDULE,
      payload: data,
    });

    dispatch(setAlert("Successfully altered status of appointment", "success"));
  } catch (error) {
    console.log(error);
  }
};

// Cancel schedule
export const cancelschedule = (id) => async (dispatch) => {
  try {
    const { data } = await api.cancelSchedule(id);

    dispatch({
      type: CANCEL_SCHEDULE,
      payload: data,
    });

    dispatch(setAlert("Schedule has been canceled", "success"));
  } catch (error) {
    console.log(error);
  }
};

// get unrated appointments
export const unratedappointments = () => async (dispatch) => {
  try {
    const { data } = await api.unratedAppointments();

    dispatch({
      type: UNRATED_APPOINTMENTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get user profile to rate
export const getvetToRate = (id) => async (dispatch) => {
  try {
    const { data } = await api.getVetToRate(id);

    dispatch({
      type: GET_USER_TO_RATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Rate a user
export const rateuser = (vet_id, formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.rateUser(vet_id, formData);

    dispatch({
      type: RATE_USER,
      payload: data,
    });

    dispatch(setAlert("Thanks for reviewing user", "success"));
    navigate(`/profile/${data.id}`);
  } catch (error) {
    console.log(error);
  }
};

// Mark notification as read
export const markasread = (id) => async (dispatch) => {
  try {
    const { data } = await api.MarkAsRead(id);

    dispatch({
      type: MARK_AS_READ,
      payload: data.id,
    });

    dispatch(setAlert(data.msg, "success"));
  } catch (error) {
    dispatch(setAlert("Something went wrong", "success"));
  }
};

// Report user
export const report = (id, text) => async (dispatch) => {
  try {
    const { data } = await api.Report(id, text);

    dispatch(setAlert(data.msg, "success"));
  } catch (error) {
    console.log(error);
  }
};

// Edit profile vet
export const editprofilevet = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.editProfileVet(formData);

    dispatch({
      type: EDIT_PROFILE_VET,
      payload: data,
    });
    dispatch(setAlert(data.msg, "success"));

    navigate(`/profile/${data.id}`);
  } catch (error) {
    console.log(error);
  }
};

// Edit profile farmer
export const editprofilefarmer = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.editProfileFarmer(formData);

    dispatch({
      type: EDIT_PROFILE_FARMER,
      payload: data,
    });
    dispatch(setAlert(data.msg, "success"));

    navigate(`/profile/${data.id}`);
  } catch (error) {
    console.log(error);
  }
};

// Change passwords
export const changepasswords = (passwords, navigate) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(passwords);

    console.log(data);
    dispatch(setAlert(data.msg, data.type));

    navigate(`/profile/${data.id}`);
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, error.response.data.type));
    console.log(error);
  }
};

// Admin verify
export const adminverify = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.adminVerify(id);

    dispatch(setAlert(data.msg, "success"));

    navigate("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// Get all reports
export const getreports = () => async (dispatch) => {
  try {
    const { data } = await api.getReports();

    dispatch({
      type: GET_REPORTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Investigate reports
export const userreports = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userReports(id);

    dispatch({
      type: INVESTIGATE,
      payload: data,
    });

    navigate(`/admin/reports/${id}`);
  } catch (error) {
    console.log(error);
  }
};

// Suspend User
export const suspenduser = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.suspendUser(id);

    dispatch(setAlert(data.msg, "success"));
    navigate("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// Unsuspend User
export const unsuspenduser = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.unsuspendUser(id);

    dispatch(setAlert(data.msg, "success"));

    navigate("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// Suspended users
export const suspendedusers = () => async(dispatch) => {
  try {
    const {data} = await api.suspendedUsers()

    dispatch({
      type: SUSPENDED_USERS,
      payload: data
    })
  } catch (error) {
    console.log(error)
  }
}