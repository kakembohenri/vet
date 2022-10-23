import NavbarAdmin from "../Navbar/NavbarAdmin";
import { TextField, Typography, Button, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { action, paper, header } from "./styles";

const Admin = () => {
  const navigate = useNavigate();
  const { admins } = useSelector((state) => state.auth.profile);

  return (
    <div>
      <NavbarAdmin />
      <div style={{ marginLeft: "15rem", marginRight: "3rem" }}>
        <Typography style={header} variant='h4' component='h1'>
          Admins
        </Typography>
        <div style={action}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField type='search' placeholder='Search for admin' />
            <Search
              sx={{
                color: "blue",
                margin: "0rem 0.8rem",
              }}
            />
          </div>
          <Button
            variant='contained'
            sx={{
              backgroundColor: "hotpink",
              color: "white",
              "&:hover": { bgcolor: "deeppink" },
              height: "fit-content",
            }}
            onClick={() => navigate("/admin/add")}>
            Add
          </Button>
        </div>
        {/* <Paper elevation={3}>
          <Typography>No.</Typography>
          <Typography>Name</Typography>
          <Typography>Email</Typography>
          <Typography>SendRounded number</Typography>
          <Typography>Priviledge</Typography>
          <Typography>Contact</Typography>
        </Paper> */}
        {admins.map((item, index) => (
          <Paper key={index} style={paper} elevation={3}>
            <Typography variant='caption' component='p'>
              {index + 1}.
            </Typography>

            <Typography fontWeight='bolder' variant='body1' component='p'>
              {item.contact[0]["email"]}
            </Typography>
            {/* <SendRounded
            sx={{
              padding: "0.5rem",
              width: "2.3rem",
              height: "2.3rem",
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
              "&.MuiPhoneBase-root:hover": {
                cursor: "pointer",
              },
            }}
          /> */}
          </Paper>
        ))}
      </div>
    </div>
  );
};
export default Admin;
