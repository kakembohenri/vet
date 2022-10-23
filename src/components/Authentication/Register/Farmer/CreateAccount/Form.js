import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { formItem, formContainer, link } from "../Verify/styles";
import { signupfarmer, sendcode } from "../../../../../actions/auth";
import axios from 'axios'

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const { phone_number, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(signupfarmer(formData, navigate));
    dispatch(sendcode(formData));

    // let code = Math.floor(Math.random() * 100000);

    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:80/ivet/verify.php',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {
    //     ...formData,
    //     code: code
    //   }
    // })
    // .then((response) => {
    //   console.log('response: ', response)
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  
  };

  return (
    <form style={formContainer} onSubmit={onSubmit}>
      <div style={formItem}>
        <TextField
          label='Phone number'
          name='phone_number'
          value={phone_number}
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
        </Button>
      </div>
      <Link style={link} to='/login'>
        Already have an account?
      </Link>
    </form>
  );
};
export default Form;
