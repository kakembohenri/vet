import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifycode } from "../../../../../actions/auth";
import { TextField, Button } from "@mui/material";
import { formItem, formContainer } from "./styles";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (code !== "") {
      dispatch(verifycode(code, navigate));
    }
  };
  return (
    <form style={formContainer} onSubmit={onSubmit}>
      {/* <div style={formItem}>
        <label htmlFor='number'>You can enter a new phone number</label>
        <TextField type='number' name='number' placeholder='07xxxxxxxx' />
        <Typography color='red' variant="subtitle2" component='p'>Error</Typography>
      </div> */}
      <div style={formItem}>
        <TextField
          type='number'
          label='Enter code'
          name='code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
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
          Send
        </Button>
      </div>
    </form>
  );
};
export default Form;
