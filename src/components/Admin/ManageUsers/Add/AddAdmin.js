import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import NavbarAdmin from "../../Navbar/NavbarAdmin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createadmin } from "../../../../actions/auth";
import { formItem, formContainer } from "./styles";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { email, password, passwordConfirm } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createadmin(formData, navigate));
  };

  return (
    <div>
      <NavbarAdmin />
      <div
        style={{ marginLeft: "15rem", marginRight: "3rem", marginTop: "2rem" }}>
        <Typography
          sx={{
            paddingBottom: "0.3rem",
            borderBottom: "0.2rem solid green",
            width: "fit-content",
          }}>
          Add new Admin user
        </Typography>
        <form style={formContainer} onSubmit={onSubmit}>
          <div style={formItem}>
            <TextField
              label='Email'
              name='email'
              value={email}
              onChange={handleChange}
            />
            {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
          </div>
          <div style={formItem}>
            <TextField
              type='password'
              name='password'
              label='New password'
              value={password}
              onChange={handleChange}
            />
            {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
          </div>
          <div style={formItem}>
            <TextField
              type='password'
              name='passwordConfirm'
              label='Confirm password'
              value={passwordConfirm}
              onChange={handleChange}
            />
            {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              variant='contained'
              size='large'
              type='Submit'
              sx={{
                padding: "0.3rem",
                backgroundColor: "hotpink",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "deeppink",
                },
                color: "white",
                margin: "0rem 0.8rem",
              }}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddAdmin;
