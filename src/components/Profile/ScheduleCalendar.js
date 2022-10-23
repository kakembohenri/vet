import { useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Typography, Paper, Box, Button } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { bookdate, removedate } from "../../actions/profile";
import {
  schedule,
  scheduleItems,
  calendarOverlay,
  calendarOverlayFarmer,
} from "./styles";

const ScheduleCalendar = ({ profile }) => {
  const [mark, setMark] = useState(false);
  const appointments = useSelector((state) => state.auth.schedule);
  const dispatch = useDispatch();
  const { bookedDates } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const setDate = (e) => {
    // Create year
    let year = e.getFullYear().toString();
    let month = e.getMonth().toString();
    let date = e.getDate().toString();

    const finalDate = `${year}-${Number(month) + 1}-${date}`;

    let newDate = moment(finalDate)._d.toString();

    let newMark = newDate.split(" ").slice(0, 4).toString().replace(/,/g, "-");

    setMark(newMark);
  };

  const bookDate = () => {
    if (mark) {
      dispatch(bookdate(mark));
    }
  };

  const onDelete = (item) => {
    dispatch(removedate(item._id));
  };

  return (
    <Paper style={schedule} elavation={2}>
      <div style={scheduleItems}>
        <div style={{ width: "40%" }}>
          <Typography
            variant='h4'
            component='h3'
            sx={{
              paddingBottom: "0.3rem",
              borderBottom: "0.3rem solid green",
              width: "fit-content",
            }}>
            Schedule
          </Typography>
          <Paper sx={{ margin: "1rem 0rem", padding: "0.5rem" }} elevation={10}>
            {appointments ? (
              !appointments?.length > 0 ? (
                <Typography>Schedule is free</Typography>
              ) : (
                appointments?.map((item, index) => (
                  <div
                    style={{
                      display: "flex",
                      margin: "0.8rem 0rem",
                      alignItems: "center",
                    }}
                    key={index}>
                    <Typography
                      style={{ paddingRight: "0.5rem" }}
                      variant='caption'
                      component='small'>
                      {index + 1}
                    </Typography>
                    <Typography variant='body1' component='p'>
                      {item?.agenda}
                    </Typography>
                    <Typography
                      style={{ padding: "0rem 0.5rem" }}
                      variant='caption'
                      component='small'>
                      {item?.date}
                    </Typography>
                    <Typography
                      className='hey'
                      style={{ padding: "0rem 0.5rem" }}
                      variant='caption'
                      component='small'>
                      {item?.time}
                    </Typography>
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0rem 0.5rem",
                      }}
                      variant='caption'
                      component='span'>
                      <div
                        className={
                          item.status === "pending"
                            ? "glow-pending"
                            : item.status === "complete"
                            ? "glow-complete"
                            : item.status === "cancel" && "glow-cancel"
                        }></div>
                      {item?.status}
                    </Typography>
                  </div>
                ))
              )
            ) : (
              <></>
            )}
          </Paper>
        </div>
        {profile._doc.vet && (
          <div style={{ width: "50%" }}>
            <Typography
              variant='h4'
              component='h3'
              sx={{
                paddingBottom: "0.3rem",
                borderBottom: "0.3rem solid green",
                width: "fit-content",
              }}>
              Calendar
            </Typography>
            <Paper
              sx={{
                display: "flex",
                margin: "1rem 0rem",
                padding: "0.5rem",
                position: "relative",
                justifyContent: "space-around",
              }}
              elevation={10}>
              <Calendar
                onClickDay={(e) => {
                  setDate(e);
                }}
              />
              {user?._doc?.farmer ? (
                <Box style={calendarOverlayFarmer}></Box>
              ) : (
                mark && (
                  <Box style={calendarOverlay} onClick={() => setMark(false)}>
                    <Button
                      variant='contained'
                      sx={{ background: "hotpink", color: "white" }}
                      onClick={bookDate}>
                      Mark "{mark}"" as booked
                    </Button>
                  </Box>
                )
              )}
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0rem 0.5rem",
                    marginBottom: "0.8rem",
                    borderBottom: "0.3rem solid green",
                  }}
                  variant='body1'
                  component='h3'>
                  Dates Booked
                </Typography>
                <div
                  style={{
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    height: "13rem",
                  }}>
                  {bookedDates &&
                    (!bookedDates.length > 0 ? (
                      <Typography
                        style={{ margin: "0.5rem 0rem" }}
                        variant='body2'
                        component='p'>
                        Schedule is free
                      </Typography>
                    ) : (
                      bookedDates.reverse().map((item, index) => (
                        <div
                          key={index}
                          style={{
                            margin: "0.5rem 0rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}>
                          <Typography variant='body2' component='span'>
                            {item.dates_booked}
                          </Typography>
                          {user?._doc?.vet === id && (
                              <DeleteRounded
                                sx={{ cursor: "pointer" }}
                                onClick={() => onDelete(item)}
                              />
                            )}
                        </div>
                      ))
                    ))}
                </div>
              </Box>
            </Paper>
          </div>
        )}
      </div>
    </Paper>
  );
};
export default ScheduleCalendar;
