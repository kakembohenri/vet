import {
  LOGOUT,
  SEARCH_SERVICES,
  SEARCH_USERS,
  SCHEDULE_FOR_USER,
  GET_CHAT,
  SEND_MESSAGE,
  GET_ALL_CHATS,
  EDIT_SCHEDULE,
  SCHEDULE_EDITED,
  GET_USER_TO_RATE,
  RATE_USER,
  GET_USER_CHAT_DETAILS,
  SEARCH_VETS,
  GET_REPORTS,
  INVESTIGATE,
  SUSPENDED_USERS,
  SIGN_IN,
  CLEAR_SEARCH
} from "../types";

let initialState = {
  searchResults: null,
  reports: null,
  userReports: null,
  searchServices: null
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return state = {
        searchResults: [],
        reports: [],
        userReports: [],
        searchServices: []
      }
    case SEARCH_SERVICES:
      return {
        ...state,
        searchServices: payload.result
      };
    case SEARCH_USERS:
      return {
        ...state,
        searchChat: payload.result,
      };
    case SCHEDULE_FOR_USER:
      return {
        ...state,
        schedule: payload.result,
      };
    case GET_CHAT:
      return {
        ...state,
        chat: payload.result,
        userChattingWith: payload.user,
        search: [],
      };
    case GET_USER_CHAT_DETAILS:
      return {
        ...state,
      };
    case GET_ALL_CHATS:
      return {
        ...state,
        allChats: payload.result,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        chat: [...state.chat, payload.result],
      };
    case EDIT_SCHEDULE:
      return {
        ...state,
        editSchedule: payload.result,
      };
    case SCHEDULE_EDITED:
      return state;
    case GET_USER_TO_RATE:
      return {
        ...state,
        rateUser: payload.result,
      };
    case RATE_USER:
      return {
        ...state,
        message: payload.msg,
      };
    case SEARCH_VETS:
      return {
        ...state,
        searchResults: [...state.searchResults, payload.vet],
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchResults: []
      }
    case GET_REPORTS:
      return {
        ...state,
        reports: [...state.reports, payload.result],
      };
    case INVESTIGATE:
      return {
        ...state,
        userReports: [...state.userReports, payload.result],
      };
    case SUSPENDED_USERS:
      return {
        ...state,
        suspendedUsers: payload.result
      }
    case LOGOUT:
      localStorage.clear()
      return (state = {
        searchResults: null,
  reports: null,
  userReports: null,
  searchServices: null
      });
    default:
      return state;
  }
};

export default profileReducer;
