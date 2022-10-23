import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import Navbar from "../Landing/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  completeschedule,
  getschedule,
  undoschedule,
  cancelschedule,
} from "../../actions/profile";
import AlertBox from "../Alert/Alert";
import { container, header } from "./styles";

const Index = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onComplete = (item) => {
    if (window.confirm("Are you sure you want to conclude this appointment")) {
      dispatch(completeschedule(item._id));
    }
  };

  const onCancel = (item) => {
    if (window.confirm("Are you sure you want to cancel this appointment")) {
      dispatch(cancelschedule(item._id.toString()));
    }
  };

  const editSchedule = (item) => {
    dispatch(getschedule(item._id));
    navigate(`/edit/schedule/${item._id.toString()}`);
  };

  const undoChanges = (item) => {
    if (
      window.confirm(
        "Are you sure you want to undo changes to this appointment?"
      )
    ) {
      dispatch(undoschedule(item._id));
    }
  };
  return (
    <div>
      <AlertBox />
      <Navbar user={auth} />
      <div style={container}>
        <Typography style={header} variant='h3' component='h4'>
          Appointments
        </Typography>
        {auth?.schedule && !auth.schedule.length > 0 ? (
          <Typography>You havent yet created a schedule</Typography>
        ) : (
          <div className='table-box'>
            <div className='table-row table-head'>
              <div className='table-cell first-cell'>
                <Typography variant='body2' component='p'>
                  No.
                </Typography>
              </div>
              <div className='table-cell'>
                <Typography variant='body2' component='p'>
                  Agenda
                </Typography>
              </div>
              <div className='table-cell time-cell'>
                <Typography variant='body2' component='p'>
                  Date
                </Typography>
              </div>
              <div className='table-cell time-cell'>
                <Typography variant='body2' component='p'>
                  Time
                </Typography>
              </div>
              <div className='table-cell last-cell'>
                <Typography variant='body2' component='p'>
                  Progress
                </Typography>
              </div>
            </div>
            {auth.schedule.map((item, index) => (
              <div key={index} style={{ width: "100%" }}>
                <div className='table-row'>
                  <div className='table-cell first-cell'>
                    <Typography variant='body2' component='p'>
                      {index + 1}
                    </Typography>
                  </div>
                  <div className='table-cell'>
                    <Typography variant='body2' component='p'>
                      {item.agenda}
                    </Typography>
                  </div>
                  <div className='table-cell time-cell'>
                    <Typography variant='body2' component='p'>
                      {item.date}
                    </Typography>
                  </div>
                  <div className='table-cell time-cell'>
                    <Typography variant='body2' component='p'>
                      {item.time} hrs
                    </Typography>
                  </div>
                  <div className='table-cell last-cell'>
                    <Typography
                      style={{ display: "flex", justifyContent: "center" }}
                      variant='body2'
                      component='span'>
                      <div
                        className={
                          item.status === "pending"
                            ? "glow-pending"
                            : item.status === "complete"
                            ? "glow-complete"
                            : item.status === "cancel" && "glow-cancel"
                        }></div>
                      {item.status}
                    </Typography>
                  </div>
                </div>
                {item?.status !== "pending" && (
                  <div>
                    <Button
                      variant='outlined'
                      size='small'
                      sx={{
                        color: "white",
                        backgroundColor: "orange",
                        margin: "0rem 0.3rem",
                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "orange",
                        },
                      }}
                      onClick={() => undoChanges(item)}>
                      Undo
                    </Button>
                  </div>
                )}  
                
                {(
                  auth?.user?._doc?.vet && (
                  item?.status === 'pending') &&
                  <div>
                    <Button
                      variant='outlined'
                      size='small'
                      sx={{
                        color: "white",
                        backgroundColor: "#23f323",
                        margin: "0rem 0.3rem",
                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "green",
                        },
                      }}
                      onClick={() => editSchedule(item)}>
                      Edit
                    </Button>
                    <Button
                      variant='outlined'
                      size='small'
                      sx={{
                        color: "white",
                        backgroundColor: "deepskyblue",
                        margin: "0rem 0.3rem",
                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "blue",
                        },
                      }}
                      onClick={() => onComplete(item)}>
                      Complete
                    </Button>
                    <Button
                      variant='contained'
                      size='small'
                      sx={{
                        color: "white",
                        backgroundColor: "crimson",
                        margin: "0rem 0.3rem",

                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "red",
                        },
                      }}
                      onClick={() => onCancel(item)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Index;
