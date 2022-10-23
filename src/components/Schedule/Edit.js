import { useState, useEffect } from "react";
import Navbar from "../Landing/Navbar/Navbar";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getschedule, editschedule } from "../../actions/profile";
import { header, formContainer, form } from "./styles";

const Edit = () => {
  const auth = useSelector((state) => state.auth);
  const edit = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    agenda: "",
    date: "",
    time: "",
  });

  const { id } = useParams();

  useEffect(() => {
    dispatch(getschedule(id));

    if (edit?.editSchedule?.agenda !== undefined) {
      setFormData((prevData) => ({
        agenda: prevData.agenda.replaceAll(
          prevData.agenda,
          edit?.editSchedule?.agenda
        ),
        date: prevData.date.replaceAll(prevData.date, edit?.editSchedule?.date),
        time: prevData.time.replaceAll(prevData.time, edit?.editSchedule?.time),
      }));
    }
  }, [
    id,
    dispatch,
    edit?.editSchedule?.agenda,
    edit?.editSchedule?.date,
    edit?.editSchedule?.time,
  ]);

  const { agenda, date, time } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSend = () => {
    dispatch(editschedule(id, formData, navigate));
  };

  return (
    <div style={formContainer}>
      <Navbar user={auth} />
      <div>
        <Typography style={header} variant='body1' component='h4'>
          Edit Appointment
        </Typography>
        <Paper style={form} elevation={5}>
          <TextField
            label='Agenda'
            multiline
            name='agenda'
            value={agenda}
            onChange={onChange}
          />
          <TextField type='date' name='date' value={date} onChange={onChange} />
          <TextField type='time' name='time' value={time} onChange={onChange} />
          <Button
            variant='outlined'
            type='submit'
            sx={{
              background: "hotpink",
              color: "white",
              "&:hover": { bgcolor: "deeppink" },
            }}
            onClick={onSend}>
            Edit
          </Button>
        </Paper>
      </div>
    </div>
  );
};
export default Edit;
