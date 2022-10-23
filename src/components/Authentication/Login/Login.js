import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { loginContainer, formItem, formContainer, link } from "./styles";
import FormImg from "../../images/FormImg";
import { login } from "../../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "../../Alert/Alert";
import Spinner from "../../images/spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    contact: "",
    password: "",
  });

  const alert = useSelector((state) => state.alert);

  const [spinner, setSpinner] = useState(false);

  const { contact, password } = formData;

  // Toggle the spinner
  useEffect(() => {
    setSpinner((prevSpinner) => false);
  }, [alert]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
    setSpinner(true);
  };
  return (
    <>
      <AlertBox />
      <FormImg />
      <form style={loginContainer} onSubmit={onSubmit}>
        {/* <LoginOutlined sx={{ color: 'black' }} /> */}
        <Link style={{ color: 'black', textDecoration: 'none'}} to='/'>
        <Typography
          style={{ margin: "1rem 0rem" }}
          fontWeight={700}
          variant='h4'
          component='p'>
          <span style={{ color: "lightgreen" }}>!</span>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>

        </Link>
        <Typography style={{ margin: "1rem 0rem" }} variant='h4' component='h3'>
          Login
        </Typography>
        <Paper style={formContainer} elevation={4}>
          <div style={formItem}>
            <TextField
              variant='outlined'
              name='contact'
              value={contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              label='Email/Username'
            />
          </div>
          <div style={formItem}>
            <TextField
              type='password'
              label='Password'
              name='password'
              value={password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Button
            variant='contained'
            type='submit'
            sx={{
              justifyContent: "space-around",
              padding: "0.3rem",
              backgroundColor: "hotpink",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "deeppink",
              },
              color: "white",
              margin: "0rem 0.8rem",
            }}>
            Login
            {spinner && <Spinner />}
          </Button>
          <Link style={link} to='/choose-user'>
            You dont have an account?
          </Link>
        </Paper>
      </form>
    </>
  );
};
export default Login;
