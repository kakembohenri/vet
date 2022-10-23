import { Typography } from "@mui/material";
import {
  Home,
  AdminPanelSettings,
  Book,
  CancelOutlined,
  Person,
  LogoutOutlined,
  ReportProblem,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/auth";
import { getreports, suspendedusers } from "../../../actions/profile";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { navbar, icon, links, link } from "./styles";

const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div style={navbar}>
      <div style={icon}>
        <Typography color='black' fontWeight={700} variant='h4' component='p'>
          <small style={{ color: "lightgreen" }}>!</small>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
        <div>
          <LogoutOutlined
            sx={{ color: "white", cursor: "pointer" }}
            onClick={onLogout}
          />
          <Typography sx={{ color: "white" }}>Logout</Typography>
        </div>
      </div>
      <div style={links}>
        <Typography sx={link} variant='body1' component='li'>
          <Link
            style={{ display: "flex", color: "white", textDecoration: "none" }}
            to='/admin/dashboard'>
            <Home sx={{ color: "lightgreen", margin: "0rem 0.5rem" }} />
            Home
          </Link>
        </Typography>
        <Typography sx={link} variant='body1' component='li'>
          <Link
            style={{ display: "flex", color: "white", textDecoration: "none" }}
            to='/admin/manage/admins'>
            <AdminPanelSettings
              sx={{ color: "lightgreen", margin: "0rem 0.5rem" }}
            />
            Admins
          </Link>
        </Typography>
        <Typography sx={link} variant='body1' component='li'>
          <Link
            style={{ display: "flex", color: "white", textDecoration: "none" }}
            to='/admin/manage/vets'>
            <Person sx={{ color: "lightgreen", margin: "0rem 0.5rem" }} />
            Vets
          </Link>
        </Typography>
        <Typography sx={link} variant='body1' component='li' onClick={() => dispatch(suspendedusers())}>
          <Link
            style={{ display: "flex", color: "white", textDecoration: "none" }}
            to='/admin/suspended'>
            <CancelOutlined
              sx={{ color: "lightgreen", margin: "0rem 0.5rem" }}
            />
            Suspended Accounts
          </Link>
        </Typography>
        <Typography
          sx={link}
          variant='body1'
          component='li'
          onClick={() => dispatch(getreports())}>
          <Link
            style={{ display: "flex", color: "white", textDecoration: "none" }}
            to='/admin/reports'>
            <ReportProblem
              sx={{ color: "lightgreen", margin: "0rem 0.5rem" }}
            />
            Reported accounts
          </Link>
        </Typography>
        <Typography sx={link} variant='body1' component='li'>
          <Link
            style={{ display: "flex", color: "white", textDecoration: "none" }}
            to='/admin/generate-reports'>
            <Book sx={{ color: "lightgreen", margin: "0rem 0.5rem" }} />
            Generate Reports
          </Link>
        </Typography>
        {/* <Typography sx={link} variant='body1' component='li'>
          <Link
            style={{ display: "flex", color: "white", textDecoration: "none" }}
            to='/admin/inbox'>
            <Message sx={{ color: "lightgreen", margin: "0rem 0.5rem" }} />
            Inbox
          </Link>
        </Typography>
        <Typography sx={link} variant='body1' component='li'>
          <Link
            style={{ display: "flex", color: "white", textDecoration: "none" }}
            to='/admin/dashboard'>
            <AdminPanelSettings
              sx={{ color: "lightgreen", margin: "0rem 0.5rem" }}
            />
            Settings
          </Link>
        </Typography> */}
      </div>
    </div>
  );
};
export default NavbarAdmin;
