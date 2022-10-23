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
} from "@mui/material";
import { SendOutlined } from "@mui/icons-material";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import {
  chatSection,
  borderRight500,
  messageArea,
  chatHeader,
  sender,
  reciever,
} from "./styles";

const AdminInbox = () => {
  return (
    <>
      <NavbarAdmin />
      <div style={{ marginLeft: "15rem" }}>
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
          <Grid item xs={3} style={borderRight500}>
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TextField
                id='outlined-basic-email'
                label='Search'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Divider />
            <List>
              <ListItem button key='Alice'>
                <ListItemIcon>
                  <Avatar alt='Alice' src='' />
                </ListItemIcon>
                <ListItemText primary='Alice'>Alice</ListItemText>
              </ListItem>
              <ListItem button key='CindyBaker'>
                <ListItemIcon>
                  <Avatar alt='Cindy Baker' src='' />
                </ListItemIcon>
                <ListItemText primary='Cindy Baker'>Cindy Baker</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={9}>
            <div style={chatHeader}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar />
                <Typography
                  sx={{ color: "white", marginLeft: "1rem" }}
                  variant='body2'
                  component='p'>
                  Name
                </Typography>
              </div>
              {/* <Button
                variant='contained'
                sx={{
                  color: "white",
                  background: "hotpink",
                  "&:hover": {
                    bgcolor: "deeppink",
                  },
                }}>
                Schedule Appointment
              </Button> */}
            </div>
            <List style={messageArea}>
              <ListItem style={{ justifyContent: "flex-end" }} key='1'>
                <Grid style={sender} container>
                  <Grid item xs={12}>
                    <ListItemText
                      align='left'
                      primary="Hey man, What's up ?"></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align='right'
                      secondary='09:30'></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem style={{ justifyContent: "flex-start" }} key='2'>
                <Grid style={reciever} container>
                  <Grid item xs={12}>
                    <ListItemText
                      align='left'
                      primary='Hey, Iam Good! What about you ?'></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align='left' secondary='09:31'></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key='3'>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align='right'
                      primary="Cool. i am good, let's catch up!"></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align='right'
                      secondary='10:30'></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id='outlined-basic-email'
                  label='Type Something'
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
                  <SendOutlined />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AdminInbox;
