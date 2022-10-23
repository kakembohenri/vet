import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addvetcontacts } from "../../../../../actions/auth";
import { TextField, Button, Box } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  WhatsApp,
  LinkedIn,
  PhoneAndroidSharp,
} from "@mui/icons-material";
import { socialItem, form } from "./styles";

const Form = () => {
  const { user } = useSelector((state) => state.auth);
  const {id} = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phone_number: "",
    facebook: "",
    twitter: "",
    instagram: "",
    whatsapp: "",
    linkedin: "",
  });

console.log("id :", id)
console.log("user: ", user)
  const { phone_number, facebook, twitter, instagram, whatsapp, linkedin } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newFormData = { id, ...user, contacts: { ...formData } };
    dispatch(addvetcontacts(newFormData, navigate));
  };
  return (
    <form style={form} onSubmit={onSubmit}>
      <div style={socialItem}>
        <PhoneAndroidSharp />
        <TextField
          label='Phone Contact'
          name='phone_number'
          value={phone_number}
          sx={{ width: "100%" }}
          onChange={onChange}
        />
        {/* <Typography color='red' variant='subtitle2' component='p'>
          Error
        </Typography> */}
      </div>
      <div style={socialItem}>
        <Facebook sx={{ color: "darkblue" }} />
        <TextField
          sx={{ width: "100%" }}
          name='facebook'
          value={facebook}
          placeholder='Facebook URL'
          onChange={onChange}
        />
      </div>
      <div style={socialItem}>
        <Twitter sx={{ color: "lightblue" }} />
        <TextField
          sx={{ width: "100%" }}
          name='twitter'
          value={twitter}
          placeholder='Twitter URL'
          onChange={onChange}
        />
      </div>
      <div style={socialItem}>
        <Instagram sx={{ color: "pink" }} />
        <TextField
          sx={{ width: "100%" }}
          name='instagram'
          value={instagram}
          placeholder='Instagram URL'
          onChange={onChange}
        />
      </div>
      <div style={socialItem}>
        <WhatsApp sx={{ color: "green" }} />
        <TextField
          sx={{ width: "100%" }}
          name='whatsapp'
          value={whatsapp}
          placeholder='WhatsApp number'
          onChange={onChange}
        />
      </div>
      <div style={socialItem}>
        <LinkedIn sx={{ color: "blue" }} />
        <TextField
          sx={{ width: "100%" }}
          name='linkedin'
          value={linkedin}
          placeholder='LinkedIn URL'
          onChange={onChange}
        />
      </div>
      <Box
        sx={{
          margin: "1rem 0rem",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Button
          variant='contained'
          sx={{
            padding: "0.3rem",
            backgroundColor: "hotpink",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "deeppink",
            },
            color: "white",
            margin: "0rem 0.8rem",
          }}
          onClick={() => navigate("/profile/vet-contacts")}>
          Back
        </Button>
        <Button
          variant='contained'
          type='submit'
          sx={{
            background: "green",
            color: "white",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "darkgreen",
            },
          }}>
          Finish up your profile
        </Button>
      </Box>
    </form>
  );
};
export default Form;
