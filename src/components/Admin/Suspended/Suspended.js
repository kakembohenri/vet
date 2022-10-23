import NavbarAdmin from "../Navbar/NavbarAdmin";
import { Typography, Button, Paper, Avatar, Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unsuspenduser } from "../../../actions/profile";
import moment from "moment";
import { header, headerContainer } from "./styles";

const Suspended = () => {
  const { suspendedUsers } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(suspendedUsers)
  return (
    <div>
      <NavbarAdmin />
      <div style={{ marginLeft: "15rem", marginRight: "3rem" }}>
        <div style={headerContainer}>
          <Typography style={header} variant='h4' component='h1'>
            Suspended Accounts: <b>{suspendedUsers?.length}</b>
          </Typography>
        </div>
        {!suspendedUsers?.length > 0 || suspendedUsers === null ? (
          <Typography>There are no reported users</Typography>
        ) : (
          suspendedUsers?.map((item, index) => (
            <Paper
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "1rem",
              }}
              elevation={5}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar src={item?.avatar} />
                <Typography component='span'>{item?.name?.map((item, index) => (
                    <span key={index}>{item} </span>
                ))}</Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                 
                </div>
              </div>
              <div>
                <Typography>
                    Suspended: 
                    {moment(item?.createdAt).fromNow()}
                </Typography>
                <Button
                  variant='contained'
                  onClick={() => dispatch(unsuspenduser(item?.user_id, navigate))}
                 >
                  Unsuspend
                </Button>

              </div>
            </Paper>
          ))
        )}
      </div>
    </div>
  );
};
export default Suspended;
