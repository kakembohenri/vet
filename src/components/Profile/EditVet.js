import { useState } from "react";
import Navbar from "../Landing/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Typography, TextField, Button } from "@mui/material";
import {
  editContainer,
  editHeader,
  editLinks,
  editFormContainer,
  editForms,
  editForm,
  activeOne,
  inactiveOne,
  activeTwo,
  inactiveTwo,
  slideLeft,
  slideRight,
} from "./styles";
import { useNavigate } from "react-router-dom";
import AlertBox from "../Alert/Alert";
import { editprofilevet, changepasswords } from "../../actions/profile";

const EditVet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [isToggled, setIsToggled] = useState("personal");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = passwords;

  const onPasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const changePassword = () => {
    dispatch(changepasswords(passwords, navigate));
  };

  const [formData, setFormData] = useState({
    name: {
      first_name: user?._doc?.name[0],
      surname: user?._doc?.name[1],
      last_name: user?._doc?.name[2] === undefined ? "" : user?._doc?.name[2],
    },
    location: {
      name: user?._doc?.location?.name,
      coordinates: {
        latitude: user?._doc?.location?.coordinates?.latitude,
        longitude: user?._doc?.location?.coordinates?.longitude,
      },
    },
    clinic: user?._doc?.clinic,
    services: user?._doc?.services,
    contacts: {
      phone_number: user?._doc?.contacts?.phone_number,
    },
    email: user?.contact[0]?.email,
  });

  const { name, location, clinic, services, contacts, email } = formData;

  const onChangeNames = (e) => {
    setFormData({
      ...formData,
      name: {
        ...formData.name,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onSend = () => {
    dispatch(editprofilevet(formData, navigate));
  };

  return (
    <div>
      <AlertBox />
      <Navbar user={auth} />
      <div style={editContainer}>
        <Typography sx={editHeader}>Edit Profile vet</Typography>
        <div>
          <div style={editLinks}>
            <Button
              variant='text'
              sx={{ color: "#454545" }}
              onClick={() => setIsToggled("personal")}>
              Personal Details
            </Button>
            <Button
              variant='text'
              sx={{ color: "#454545" }}
              onClick={() => setIsToggled("password")}>
              Change Password
            </Button>
            <span
              style={isToggled === "personal" ? slideLeft : slideRight}></span>
          </div>
          <div style={editFormContainer}>
            <div style={isToggled === "personal" ? activeOne : inactiveOne}>
              <div style={editForms}>
                <div style={{ display: "flex" }}>
                  <TextField
                    label='First name'
                    name='first_name'
                    value={name.first_name}
                    onChange={onChangeNames}
                  />
                  <TextField
                    label='Surname'
                    name='surname'
                    value={name.surname}
                    onChange={onChangeNames}
                  />
                  <TextField
                    label='Last name'
                    name='last_name'
                    value={name.last_name}
                    onChange={onChangeNames}
                  />
                </div>

                <div style={editForm}>
                  <TextField label='Location' value={location?.name} />
                  <TextField
                    label='Clinic'
                    value={clinic}
                    onChange={(e) =>
                      setFormData({ ...formData, clinic: e.target.value })
                    }
                  />
                  <TextField
                    label='email'
                    name='email'
                    value={email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <textarea
                    name='about'
                    style={{
                      height: "10rem",
                      width: "60%",
                      resize: "none",
                      padding: "1rem",
                      fontFamily: "sans-serif",
                    }}
                    value={services}
                    onChange={(e) =>
                      setFormData({ ...formData, services: e.target.value })
                    }
                    placeholder='What does your farm deal in?'></textarea>
                  <TextField
                    label='Phone number'
                    name='phone_number'
                    value={contacts.phone_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contacts: {
                          ...formData.contacts,
                          phone_number: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Button
                  sx={{ width: "fit-content" }}
                  variant='contained'
                  onClick={onSend}>
                  Edit Profile
                </Button>
              </div>
            </div>
            <div style={isToggled === "password" ? activeTwo : inactiveTwo}>
              <div>
                <TextField
                  label='Old Password'
                  name='oldPassword'
                  type='password'
                  value={oldPassword}
                  onChange={onPasswordChange}
                />
              </div>
              <div>
                <TextField
                  label='New Password'
                  name='newPassword'
                  type='password'
                  value={newPassword}
                  onChange={onPasswordChange}
                />
              </div>
              <TextField
                label='Confirm Password'
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={onPasswordChange}
              />
              <Button variant='contained' onClick={changePassword}>
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditVet;
