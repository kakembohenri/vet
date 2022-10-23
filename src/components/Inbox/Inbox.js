import { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Divider,
  ListItemIcon,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Fab,
  Button,
} from "@mui/material";
import { SendOutlined } from "@mui/icons-material";
import Navbar from "../Landing/Navbar/Navbar";
import Query from "./Query";
import {
  chatSection,
  borderRight500,
  messageArea,
  chatHeader,
  userActivated,
  senderBox,
  recieverBox,
} from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  searchusers,
  retrievechats,
  scheduleuser,
  sendmessage,
  getallchats,
} from "../../actions/profile";
import moment from "moment";

const Chat = () => {
  const auth = useSelector((state) => state.auth);
  const query = useSelector((state) => state.profile);
  const user = useSelector((state) => state.profile);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [reciever, setReciever] = useState("");
  const [current, setCurrent] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search !== "") {
      dispatch(searchusers(search));
    }
  };

  const onClick = (name) => {
    setSearch("");
    if (name?.vet) {
      dispatch(retrievechats(current, name.vet));
    } else {
      dispatch(retrievechats(current, name.farmer));
    }
  };

  useEffect(() => {
    if (auth.user._doc?.vet) {
      setCurrent(auth.user._doc.vet);
    } else {
      setCurrent(auth.user._doc.farmer);
    }
  }, [auth.user._doc.vet, auth.user._doc.farmer]);

  const scheduleAppointment = () => {
    dispatch(scheduleuser(user?.userChattingWith?.farmer, navigate));
  };

  //  Getting the senders id
  useEffect(() => {
    if (auth.user._doc?.farmer) {
      setSender(auth.user._doc.farmer);
    } else {
      setSender(auth.user._doc.vet);
    }
  }, [message, auth.user._doc?.farmer, auth.user._doc?.vet]);

  // Get all chats
  useEffect(() => {
    dispatch(getallchats(id));
  }, [dispatch, id]);

  // Getting the recievers id
  useEffect(() => {
    if (user?.userChattingWith?.farmer) {
      setReciever(user?.userChattingWith.farmer);
    } else if (user?.userChattingWith?.vet) {
      setReciever(user?.userChattingWith.vet);
    }
  }, [message, user?.userChattingWith?.farmer, user?.userChattingWith?.vet]);

  const onSend = () => {
    dispatch(sendmessage(sender, reciever, message));
    setMessage("");
  };

  return (
    <div>
      <Navbar user={auth} />
      {/* <Grid container>
      </Grid> */}
      <Grid container component={Paper} style={chatSection}>
        <Grid item xs={12}>
          <Typography
            style={{ textAlign: "center" }}
            variant='h5'
            className='header-message'>
            Chat
          </Typography>
        </Grid>
        <div style={{ display: "flex", width: "100%" }}>
          <div style={user?.chat ? userActivated : borderRight500}>
            <Grid
              item
              xs={12}
              style={{ padding: "10px", position: "relative" }}>
              <TextField
                id='outlined-basic-email'
                label='Search'
                variant='outlined'
                fullWidth
                value={search}
                onChange={handleSearch}
              />
              {search !== "" && (
                <Query names={query} auth={auth} setSearch={setSearch} />
              )}
            </Grid>
            <Divider />
            <List>
              {user?.allChats && !user?.allChats?.length > 0 ? (
                <Typography
                  variant='body1'
                  component='h3'
                  sx={{ height: "5rem" }}>
                  No recent chats
                </Typography>
              ) : (
                user.allChats?.map((item, index) => (
                  <ListItem button key={index} onClick={() => onClick(item)}>
                    <ListItemIcon>
                      <Avatar src={item.profile_pic} />
                    </ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItem>
                ))
              )}
            </List>
          </div>
          {user?.userChattingWith && (
            <Grid item xs={9}>
              <div style={chatHeader}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={user?.userChattingWith?.profile_pic} />
                  <Typography
                    sx={{ color: "white", marginLeft: "1rem" }}
                    variant='body2'
                    component='span'>
                    {user?.userChattingWith?.name?.map((item, index) => (
                      <span key={index}>{item} </span>
                    ))}
                  </Typography>
                </div>
                {auth.user._doc?.vet && (
                  <Button
                    variant='contained'
                    sx={{
                      color: "white",
                      background: "hotpink",
                      "&:hover": {
                        bgcolor: "deeppink",
                      },
                    }}
                    onClick={scheduleAppointment}>
                    Schedule Appointment
                  </Button>
                )}
              </div>

              <List style={messageArea}>
                {!user?.chat?.length > 0 ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      sx={{
                        padding: "0.5rem",
                        background: "hotpink",
                        color: "white",
                      }}>
                      Start chatting
                    </Typography>
                  </div>
                ) : (
                  user?.chat.map((item, index) => (
                    <div key={index}>
                      {item.sender ===
                        (auth.user._doc?.farmer || auth.user._doc?.vet) && (
                        <ListItem
                          style={{ justifyContent: "flex-end" }}
                          key='1'>
                          <Grid style={senderBox} container>
                            <Grid item xs={12}>
                              <ListItemText
                                align='left'
                                color='white'
                                primary={item.body}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align='right'
                                secondary={moment(
                                  item.dateSent
                                ).fromNow()}></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>
                      )}
                      {item.reciever ===
                        (auth.user._doc?.farmer || auth.user._doc?.vet) && (
                        <ListItem
                          style={{ justifyContent: "flex-start" }}
                          key='2'>
                          <Grid style={recieverBox} container>
                            <Grid item xs={12}>
                              <ListItemText
                                align='left'
                                color='white'
                                primary={item.body}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align='left'
                                secondary={moment(
                                  item.dateSent
                                ).fromNow()}></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>
                      )}
                    </div>
                  ))
                )}
              </List>
              <Divider />
              <Grid container style={{ padding: "20px" }}>
                <Grid item xs={11}>
                  <TextField
                    id='outlined-basic-email'
                    label='Type Something'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1} align='right'>
                  <Fab
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": { bgcolor: "darkgreen" },
                    }}
                    aria-label='add'>
                    <SendOutlined onClick={onSend} />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default Chat;
