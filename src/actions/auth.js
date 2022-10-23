import {
  SIGNUP_FARMER,
  SEND_CODE,
  VERIFY_CODE,
  CREATE_PROFILE_FARMER,
  SIGNUP_VET,
  CREATE_PROFILE_VET,
  CONFIRM_EMAIL,
  ADD_PROFILE_CONTACTS,
  SIGN_IN,
  CREATE_ADMIN,
  FETCH_DASHBOARD,
  SIGN_OUT,
  FETCH_VETS,
} from "../types";
import * as api from "../api/index";
import { setAlert } from "./alert";

// Login

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({
      type: SIGN_IN,
      payload: data,
    });

    dispatch(setAlert("Login successfull", "success"));

    if (data.result?._doc?.vet) {
      navigate(`/profile/${data.result?._doc?.vet?.toString()}`);
    } else if (data.result?._doc?.farmer) {
      navigate(`/profile/${data.result?._doc?.farmer?.toString()}`);
    } else if (data.user === "admin") {
      navigate("/admin/dashboard");
    }
  } catch (error) {
    // console.log(error);
    dispatch(setAlert(error.response.data.msg, "error"));
  }
};
// Signup Farmer
export const signupfarmer = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signupFarmer(formData);

    dispatch({
      type: SIGNUP_FARMER,
      payload: data,
    });

    navigate("/verify-farmer");
  } catch (error) {
    console.log(error);
  }
};

// Send code
export const sendcode = (formData, navigate) => async (dispatch) => {
  let code = Math.floor(Math.random() * 1000000);
  let phone_number = formData.phone_number;

  try {
    const { data } = await api.sendCode(phone_number, code);

    dispatch({
      type: SEND_CODE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Verify code
export const verifycode = (code, navigate) => async (dispatch) => {
  try {
    const { data } = await api.verifyCode(code);

    dispatch({
      type: VERIFY_CODE,
      payload: data,
    });

    navigate("/create-profile/personal-details/farmer");
  } catch (error) {
    console.log(error);
  }
};

// Create farmer profile
export const createfarmerprofile = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createFarmerProfile(formData);

    dispatch({
      type: CREATE_PROFILE_FARMER,
      payload: data,
    });


    // navigate("/profile");
  } catch (error) {
    console.log(error);
  }
};

// Create vet profile
export const createvetprofile = (formData, navigate) => async (dispatch) => {
  try {
    // const { data } = await api.createVetProfile(formData);
    dispatch({
      type: CREATE_PROFILE_VET,
      payload: formData,
    });

    navigate("/profile/vet-contacts");
  } catch (error) {
    console.log(error);
  }
};

// Send email
export const signupvet = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signupVet(formData);

    dispatch({
      type: SIGNUP_VET,
      payload: data,
    });

    navigate("/verify-email");
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, "error"));
    console.log(error);
  }
};

// Confirm email
export const confirmemail = (email, code, id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.confirmEmail(email, code, id);

    dispatch({
      type: CONFIRM_EMAIL,
      payload: data,
    });

    navigate("/create-profile/personal-details/vet");
  } catch (error) {
    console.log(error);
  }
};

// Send vet profile contacts
export const addvetcontacts = (newFormData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.addVetContacts(newFormData);

    dispatch({
      type: ADD_PROFILE_CONTACTS,
      payload: data,
    });
     navigate(`/profile/${data.id}`);
  } catch (error) {
    console.log(error);
  }
};

// Create admin
export const createadmin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createAdmin(formData);

    dispatch({
      type: CREATE_ADMIN,
      payload: data,
    });

    navigate("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const fetchdashboard = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDashboard();

    dispatch({
      type: FETCH_DASHBOARD,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: SIGN_OUT,
    });

    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

// Fetch vets
export const fetchvets = () => async(dispatch) =>{
  try {
    const {data} = await api.fetchVets()

    dispatch({
      type: FETCH_VETS,
      payload: data
    })
    
  } catch (error) {
    console.log(error)
  }
}