import { Paper, Typography, Grid } from "@mui/material";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { header, itemDetails } from "./styles";
import schedule from "../../images/schedule.png";
import vet from "../../images/vet.png";
import farmer from "../../images/farmer.png";
import complete from "../../images/complete.png";
import cancel from "../../images/canceled.png";
import { useSelector } from "react-redux";
// import { fetchdashboard } from "../../../actions/auth";
// import { useEffect } from "react";
import AlertBox from "../../Alert/Alert";

const Dashboard = () => {
  const dashboard = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchdashboard());
  // }, [dispatch]);

  // console.log(dashboard.profile);
  return (
    <div>
      <AlertBox />
      <NavbarAdmin />
      <div style={{ marginLeft: "15rem", marginRight: "3rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "1rem 0rem",
          }}>
          <Typography style={header} variant='h4' component='h1'>
            Dashboard
          </Typography>
          <Grid container spacing={1}>
            <Grid item lg={4}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "1rem",
                }}
                elevation={3}>
                <div style={itemDetails}>
                  <Typography
                    variant='body2'
                    component='p'
                    fontWeight='bolder'
                    fontSize='1.2rem'>
                    {dashboard.profile.appointments.length}
                  </Typography>
                  <Typography variant='body1' component='p' fontWeight='bolder'>
                    Total scheduled appointments
                  </Typography>
                </div>
                <img style={{ height: "5rem" }} src={schedule} alt='cool' />
              </Paper>
            </Grid>
            <Grid item lg={4}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "1rem",
                }}
                elevation={3}>
                <div style={itemDetails}>
                  <Typography
                    variant='body2'
                    component='p'
                    fontWeight='bolder'
                    fontSize='1.2rem'>
                    {dashboard.profile.vets}
                  </Typography>
                  <Typography variant='body1' component='p' fontWeight='bolder'>
                    Total Vets
                  </Typography>
                </div>
                <img style={{ height: "5rem" }} src={vet} alt='cool' />{" "}
              </Paper>
            </Grid>
            <Grid item lg={4}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "1rem",
                }}
                elevation={3}>
                <div style={itemDetails}>
                  <Typography
                    variant='body2'
                    component='p'
                    fontWeight='bolder'
                    fontSize='1.2rem'>
                    {dashboard.profile.farmers}
                  </Typography>
                  <Typography variant='body1' component='p' fontWeight='bolder'>
                    Total Farmers
                  </Typography>
                </div>
                <img style={{ height: "5rem" }} src={farmer} alt='cool' />
              </Paper>
            </Grid>
            <Grid item lg={4}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "1rem",
                }}
                elevation={3}>
                <div style={itemDetails}>
                  <Typography
                    variant='body2'
                    component='p'
                    fontWeight='bolder'
                    fontSize='1.2rem'>
                    {
                      dashboard.profile.appointments.filter(
                        (item) => item.status === "complete"
                      ).length
                    }
                  </Typography>
                  <Typography variant='body1' component='p' fontWeight='bolder'>
                    Total Appointments Completed
                  </Typography>
                </div>
                <img style={{ height: "5rem" }} src={complete} alt='cool' />
              </Paper>
            </Grid>
            <Grid item lg={4}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "1rem",
                }}
                elevation={3}>
                <div style={itemDetails}>
                  <Typography
                    variant='body2'
                    component='p'
                    fontWeight='bolder'
                    fontSize='1.2rem'>
                    {
                      dashboard.profile.appointments.filter(
                        (item) => item.status === "cancel"
                      ).length
                    }
                  </Typography>
                  <Typography variant='body1' component='p' fontWeight='bolder'>
                    Total Appointements Canceled
                  </Typography>
                </div>
                <img style={{ height: "5rem" }} src={cancel} alt='cool' />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
