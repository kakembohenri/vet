import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { formItem, formContainer, link } from "../Verify/styles";
import { signupfarmer } from "../../../../../actions/auth";
import axios from "axios";
import AlertBox from "../../../../Alert/Alert";
import { setAlert } from "../../../../../actions/alert";
import Spinner from "../../../../images/spinner";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const alert = useSelector((state) => state.alert);

  const [spinner, setSpinner] = useState(false);

  // Toggle the spinner
  useEffect(() => {
    setSpinner((prevSpinner) => false);
  }, [alert]);

  const { phone_number, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    let code = Math.floor(Math.random() * 100000);

    axios({
      method: "POST",
      url: "http://localhost:8080/ivet/verify.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...formData,
        code: code,
      },
    })
      .then((response) => {
        console.log("response: ", response);

        let newFormData = {
          ...formData,
          code: code,
        };

        dispatch(signupfarmer(newFormData, navigate));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setAlert(`Unable to send code to ${phone_number}`, "error"));
      });
  };

  return (
    <>
      <AlertBox />
      <form style={formContainer} onSubmit={onSubmit}>
        <div style={formItem}>
          <TextField
            label='Phone number'
            name='phone_number'
            value={phone_number}
            onChange={handleChange}
            placeholder='07xxxxx'
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
            name='confirmPassword'
            label='Confirm password'
            value={confirmPassword}
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
            {spinner && <Spinner />}
          </Button>
        </div>
        <Link style={link} to='/login'>
          Already have an account?
        </Link>
      </form>
    </>
  );
};
export default Form;
