import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Paper } from "@mui/material";
import FormImg from "../images/FormImg";
import { useSelector, useDispatch } from "react-redux";
import { createschedule } from "../../actions/profile";

const CreateSchedule = () => {
  const [formData, setFormData] = useState({
    agenda: "",
    date: "",
    time: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.schedule);
  const { agenda, date, time } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    dispatch(createschedule(user.farmer, formData, navigate));
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormImg />
      <div style={loginContainer}>
        {/* <LoginOutlined sx={{ color: 'black' }} /> */}
        <Typography
          style={{ margin: "0.5rem 0rem" }}
          fontWeight={700}
          variant='h4'
          component='p'>
          <small style={{ color: "lightgreen" }}>!</small>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
        <Typography
          style={{ margin: "0.5rem 0rem" }}
          variant='h4'
          component='h3'>
          Schedule an appointment with {'"'}
          {user.name.map((item, index) => (
            <span key={index}>{item} </span>
          ))}
          {'"'}
        </Typography>
        <Paper style={formContainer} elevation={4}>
          <div style={formItem}>
            <TextField
              variant='outlined'
              multiline
              label='Agenda'
              name='agenda'
              value={agenda}
              onChange={onChange}
            />
          </div>
          <div style={formItem}>
            <Typography>Set Date</Typography>
            <TextField
              type='date'
              name='date'
              value={date}
              onChange={onChange}
            />
            {/* <Typography color='red' variant='subtitle2' component='p'>
              Error
            </Typography> */}
          </div>
          <div style={formItem}>
            <Typography>Set Time</Typography>
            <TextField
              type='time'
              name='time'
              value={time}
              onChange={onChange}
            />
            {/* <Typography color='red' variant='subtitle2' component='p'>
              Error
            </Typography> */}
          </div>
          <Button
            variant='contained'
            sx={{
              background: "hotpink",
              color: "white",
              "&:hover": { bgcolor: "deeppink" },
            }}
            onClick={onSubmit}>
            Set Appointment
          </Button>
        </Paper>
      </div>
    </>
  );
};

const loginContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const formContainer = {
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
};

const formItem = {
  margin: "1rem 0rem",
};

export default CreateSchedule;
