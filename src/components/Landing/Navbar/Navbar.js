import { useNavigate, Link } from "react-router-dom";
import { AppBar, Typography, Button, Paper } from "@mui/material";
import { Person, Inbox, Logout, Schedule, Settings, SearchSharp } from "@mui/icons-material";
import {
  navbar,
  iconBox,
  linkContainer,
  linkItem,
  link,
  // navbarScroll,
  loggedIn,
} from "./styles";
import Notification from "./Notification";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/profile";

const Navbar = ({ user }) => {
 
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <AppBar style={navbar}>
      <div style={iconBox}>
          <Typography color='black' fontWeight={700} variant='h4' component='p'>
            <small style={{ color: "lightgreen" }}>i</small>V
            <span style={{ color: "lightgreen" }}>e</span>t
          </Typography>
      </div>
      <div style={user?.isAuthenticated ? loggedIn : linkContainer}>
      {user?.isAuthenticated && (
        <Typography style={linkItem} variant='body1' component='li'>
            <Link
              style={link}
              className='icon-name'
              title='Search for services'
              to='/home'>
          <SearchSharp />
              
            </Link>
        </Typography>
      )}
        <Typography style={linkItem} variant='body1' component='li'>
          {user?.isAuthenticated ? (
            <Link
              style={link}
              className='icon-name'
              title='Profile'
              to={
                user?.user?._doc.farmer
                  ? `/profile/${user?.user?._doc.farmer}`
                  : `/profile/${user?.user?._doc.vet}`
              }>
              <Person />
            </Link>
          ) : (
            <a style={link} href='#home'>
              Home
            </a>
          )}
        </Typography>
        <Typography style={linkItem} variant='body1' component='li'>
          {user?.isAuthenticated ? (
            <Link
              style={link}
              to={
                user?.user?._doc.farmer
                  ? `/inbox/${user?.user?._doc.farmer}`
                  : `/inbox/${user?.user?._doc.vet}`
              }
              className='icon-name'
              title='Inbox'>
              <Inbox />
            </Link>
          ) : (
            <>
            <a style={link} href='#about'>
              About
            </a>
            
            
            </>
          )}
        </Typography>
        {!user?.isAuthenticated && (
        <Typography style={linkItem} variant='body1' component='li'>
            <a style={link} href='#vets'>
              Vets
            </a>
        </Typography>

        )}
        <Typography style={linkItem} variant='body1' component='li'>
          {user?.isAuthenticated ? (
            <a
              style={link}
              className='icon-name'
              title='Schedule'
              href='/schedule'>
              <Schedule />
            </a>
          ) : (
            <a style={link} href='#features'>
              Features
            </a>
          )}
        </Typography>
        {user?.isAuthenticated && <Notification user={user} />}
        <Typography style={linkItem} variant='body1' component='li'>
          {!user?.isAuthenticated && (
            <a style={link} href='#contact'>
              Contact
            </a>
          )}
        </Typography>
        {user?.isAuthenticated && (
          <Typography
            style={linkItem}
            title='Settings'
            id='settings-icon'
            variant='body1'
            component='li'>
            <Settings
              sx={{ color: "lightgreen", "&:hover": { cursor: "pointer" } }}
            />
            <Paper className='settings' elevation={5}>
              <Link
                to={
                  user?.user?._doc.farmer
                    ? `/profile/farmer/edit/${user?.user?._doc.farmer}`
                    : `/profile/vet/edit/${user?.user?._doc.vet}`
                }>
                <Typography
                  style={{ margin: "0.4rem 0rem" }}
                  variant='body1'
                  component='p'>
                  Edit Profile
                </Typography>
              </Link>
              {/* <Link to='/edit-profile'>
                <Typography
                  style={{ margin: "0.4rem 0rem" }}
                  variant='body1'
                  component='p'>
                  Request Account verification
                </Typography>
              </Link> */}
            </Paper>
          </Typography>
        )}
        {user?.isAuthenticated ? (
          <Typography
            style={linkItem}
            className='icon-name'
            title='Logout'
            variant='body1'
            component='li'>
            <Logout
              sx={{ color: "lightgreen", "&:hover": { cursor: "pointer" } }}
              onClick={onLogout}
            />
          </Typography>
        ) : (
          <>
            <Button
              sx={{
                padding: "0.3rem",
                backgroundColor: "hotpink",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "deeppink",
                },
                color: "white",
                margin: "0rem 0.8rem",
              }}
              onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button
              sx={{
                padding: "0.3rem",
                backgroundColor: "hotpink",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "deeppink",
                },
                color: "white",
                margin: "0rem 0.8rem",
              }}
              onClick={() => navigate("/choose-user?")}>
              Create an Account
            </Button>
          </>
        )}
      </div>
    </AppBar>
  );
};
export default Navbar;
