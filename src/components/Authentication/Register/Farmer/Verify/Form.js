import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifycode } from "../../../../../actions/auth";
import { TextField, Button } from "@mui/material";
import { formItem, formContainer } from "./styles";
import AlertBox from "../../../../Alert/Alert";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const contact = useSelector((state) => state.auth);

  // console.log(id.farmer._id);
  const onSubmit = (e) => {
    e.preventDefault();
    if (code !== "") {
      let formData = {
        phone_number: contact.farmer.contact[0].phone_number,
        code: code,
      };

      // console.log(formData);
      dispatch(verifycode(formData, navigate));
    }
  };
  return (
    <>
      <AlertBox />
      <form style={formContainer} onSubmit={onSubmit}>
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
    </>
  );
};
export default Form;
