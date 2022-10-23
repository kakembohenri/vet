import {
  LOGOUT,
  SIGNUP_FARMER,
  SEND_CODE,
  VERIFY_CODE,
  CREATE_PROFILE_FARMER,
  CREATE_PROFILE_VET,
  SIGNUP_VET,
  CONFIRM_EMAIL,
  SIGN_IN,
  SIGN_OUT,
  ADD_PROFILE_CONTACTS,
  COMPLETE_SCHEDULE,
  CREATE_ADMIN,
  FETCH_DASHBOARD,
  GET_VET_PROFILE,
  GET_PROFILE,
  CREATE_SCHEDULE,
  MARK_AS_READ,
  BOOK_DATE,
  REMOVE_DATE,
  UNDO_SCHEDULE,
  CANCEL_SCHEDULE,
  EDIT_PROFILE_FARMER,
  EDIT_PROFILE_VET,
  FETCH_VETS,
} from "../types";

let initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  profile: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT:
      localStorage.clear();
      return (state = initialState);
    case SIGN_IN:
      localStorage.setItem("user", payload.token);
      return {
        ...state,
        token: localStorage.getItem("user"),
        isAuthenticated: true,
        user: payload.result,
        profile: payload.result,
        isSuspended: payload.isSuspended
      };
    case EDIT_PROFILE_FARMER:
    case EDIT_PROFILE_VET:
      return {
        ...state,
        user: payload.result,
      };
    case GET_PROFILE:
      return {
        ...state,
        schedule: payload.schedule,
        bookedDates: payload.bookedDates,
        profile: payload.result,
        notifications: payload.notifications,
        reviews: payload.reviews,
        isSuspended: payload.isSuspended

      };
    case GET_VET_PROFILE:
      return {
        ...state,
        schedule: payload.schedule,
        bookedDates: payload.bookedDates,
        profile: payload.result,
      };
    case SIGN_OUT:
      localStorage.clear();
      return {
        state: initialState,
      };
    case SIGNUP_FARMER:
      localStorage.setItem("user", payload.token);
      return {
        ...state,
        isAuthenticated: true,
      };
    case VERIFY_CODE:
      return { ...state, user: payload.result };
    case SEND_CODE:
      return state;
    case CREATE_PROFILE_FARMER:
      return { ...state, user: payload.result };
    case CREATE_PROFILE_VET:
      return { ...state, user: payload };
    case SIGNUP_VET:
      localStorage.setItem("user", payload.token);
      return { ...state, user: payload.result };
    case CONFIRM_EMAIL:
      return { ...state, id: payload.result };
    case ADD_PROFILE_CONTACTS:
      localStorage.setItem("user", payload.token);
      return { ...state, 
        isAuthenticated: true,
        user: payload.result,
        profile: payload.result 
      };
    case CREATE_SCHEDULE:
      return {
        ...state,
        schedule: [...state.schedule, payload.result],
      };
    case COMPLETE_SCHEDULE:
    case UNDO_SCHEDULE:
    case CANCEL_SCHEDULE:
      return {
        ...state,
        schedule: [
          ...state.schedule.filter((item) => item._id !== payload.result._id),
          payload.result,
        ],
      };
    case CREATE_ADMIN:
      return {
        ...state,
        message: payload,
      };
    case FETCH_DASHBOARD:
      return {
        ...state,
        appointments: payload.appointments,
        vets: payload.vets,
        farmers: payload.farmers,
      };
    case MARK_AS_READ:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter((item) => item._id !== payload),
        ],
      };
    case BOOK_DATE:
      return {
        ...state,
        bookedDates: [...state.bookedDates, payload.result],
      };
    case REMOVE_DATE:
      return {
        ...state,
        bookedDates: [
          ...state.bookedDates.filter((item) => item._id !== payload.id),
        ],
      };
    case FETCH_VETS:
      console.log('Result: ', payload)
      return {
        ...state,
        vets: payload
      }
    default:
      return state;
  }
};

export default authReducer;
