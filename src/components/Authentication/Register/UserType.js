import { useNavigate, Link } from "react-router-dom";
import { Typography, Paper } from "@mui/material";
import { mainContainer, userContainer, userItem, userImg } from "./styles";
import "./UserType.css";
import farmer from "../../images/farmer.jpeg";
import vet from "../../images/vet.jpeg";
import FormImg from "../../images/FormImg";

const UserType = () => {
  const navigate = useNavigate();

  return (
    <>
      <FormImg />
      <div style={mainContainer}>
      <Link style={{ color: 'black', textDecoration: 'none'}} to='/'>
        <Typography
          style={{ margin: "1rem 0rem" }}
          fontWeight={700}
          variant='h4'
          component='p'>
          <span style={{ color: "lightgreen" }}>!</span>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
        </Link>
        <Typography variant='h4' component='h3'>
          Choose the type of user to register as
        </Typography>
        <div style={userContainer}>
          <Paper
            style={userItem}
            className='usertype'
            elevation={5}
            onClick={() => navigate("/register-farmer")}>
            <img style={userImg} src={farmer} alt='farmer' />
            <Typography variant='subtitle1' component='p'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus, excepturi.
            </Typography>
          </Paper>
          <Paper
            style={userItem}
            className='usertype'
            onClick={() => navigate("/register-vet")}
            elevation={5}>
            <img style={userImg} src={vet} alt='vet' />
            <Typography variant='subtitle1' component='p'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus, excepturi.
            </Typography>
          </Paper>
        </div>
      </div>
    </>
  );
};
export default UserType;
