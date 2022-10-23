import {
  Button,
  Typography,
  Divider,
  Avatar,
  Badge,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Notifications } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { markasread } from "../../../actions/profile";
import moment from "moment";
import { linkItem, noti } from "./styles";

const Notification = ({ user }) => {
  const dispatch = useDispatch();

  const MarkAsRead = (item) => {
    dispatch(markasread(item._id));
  };

  return (
    <Typography
      style={linkItem}
      title='Notifications'
      id='notifications-icon'
      variant='body1'
      component='li'>
      {!user?.notifications?.length > 0 ? (
        <Notifications
          sx={{ color: "lightgreen", "&:hover": { cursor: "pointer" } }}
        />
      ) : (
        <Badge badgeContent={user?.notifications?.length} color='error'>
          <Notifications
            sx={{ color: "lightgreen", "&:hover": { cursor: "pointer" } }}
          />
        </Badge>
      )}

      <Paper className='notifications' elevation={5}>
        {!user?.notifications?.length > 0 ? (
          <Typography>No notifications</Typography>
        ) : (
          <div>
            {user?.notifications?.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "1rem 0rem",
                }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Avatar src={item.sender.avatar} />
                  <Typography>
                    {item.sender.name.map((item, index) => (
                      <span key={index}>{item} </span>
                    ))}
                  </Typography>
                  <Typography>{moment(item.createdAt).fromNow()}</Typography>
                </div>
                <Typography
                  key={index}
                  style={{ margin: "0.4rem 0rem" }}
                  variant='body1'
                  component='span'>
                  {item.subject === "chat" && "Has sent you a message"}
                  {item.subject === "appointment" &&
                    "Has set up a schedule with you"}
                  {item.subject === "complete" && (
                    <Link
                      style={noti}
                      to={`/rate/experience-with/${
                        item.sender.user
                      }/${item._id.toString()}`}>
                      Has concluded the appointment with you. We would like to
                      know what your experience was
                    </Link>
                  )}
                  {item.subject === "edit" && "Has edited a schedule with you"}
                  {item.subject === "rate" &&
                    "Has just reviewed your concluded appointment with them"}
                </Typography>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => MarkAsRead(item)}>
                  Mark as read
                </Button>
                <Divider sx={{ height: "1rem" }} />
              </div>
            ))}
          </div>
        )}
      </Paper>
    </Typography>
  );
};
export default Notification;
