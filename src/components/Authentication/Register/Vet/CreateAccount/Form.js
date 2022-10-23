import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import { formItem, formContainer } from "./styles";
import { signupvet } from "../../../../../actions/auth";
import AlertBox from "../../../../Alert/Alert";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) return alert("Passwords dont match");
    dispatch(signupvet(formData, navigate));
  };
  return (
    <>
    <AlertBox />
    <form style={formContainer} onSubmit={onSubmit}>
      <div style={formItem}>
        <TextField
          label='email'
          name='email'
          value={email}
          onChange={onChange}
        />
        {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
      </div>
      <div style={formItem}>
        <TextField
          type='password'
          name='password'
          value={password}
          label='New password'
          onChange={onChange}
        />
        {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
      </div>
      <div style={formItem}>
        <TextField
          type='password'
          name='passwordConfirm'
          label='Confirm password'
          value={passwordConfirm}
          onChange={onChange}
        />
        {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          variant='contained'
          size='large'
          type='submit'
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
    </>
  );
};
export default Form;
