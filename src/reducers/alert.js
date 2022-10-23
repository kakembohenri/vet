import { SET_ALERT, REMOVE_ALERT, LOGOUT } from "../types";

let initialState = null;

const alertReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_ALERT:
      return { ...state, ...payload };
    case REMOVE_ALERT:
      return (state = initialState);
    case LOGOUT:
      return (state = initialState);
    default:
      return state;
  }
};
export default alertReducer;
