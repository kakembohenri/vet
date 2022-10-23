import { Paper, Typography, Grid } from "@mui/material";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { header, itemDetails } from "./styles";
import schedule from "../../images/schedule.png";
import vet from "../../images/vet.png";
import farmer from "../../images/farmer.png";
import completeimg from "../../images/complete.png";
import cancel from "../../images/canceled.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchvets } from "../../../actions/auth";
// import { useEffect } from "react";
import AlertBox from "../../Alert/Alert";

const Dashboard = () => {
  const dashboard = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchdashboard());
  // }, [dispatch]);

  // console.log(dashboard.profile);

  const appointmentsReport = () => {
    navigate("/admin/reports/appointments");
  };

  const vetsReport = () => {
    dispatch(fetchvets());
    navigate("/admin/reports/vets");
  };

  const farmersReport = () => {
    navigate("/admin/reports/farmers");
  };

  // const usersReport = () => {
  //   navigate("/admin/reports/users")
  // }

  // const complete = () => {
  //   navigate("/admin/reports/complete");
  // };

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
            <Grid
              item
              lg={4}
              sx={{ cursor: "pointer" }}
              onClick={appointmentsReport}>
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
            <Grid item sx={{ cursor: "pointer" }} lg={4} onClick={vetsReport}>
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
            <Grid
              item
              sx={{ cursor: "pointer" }}
              lg={4}
              onClick={farmersReport}>
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
                    {dashboard.profile.farmers.length}
                  </Typography>
                  <Typography variant='body1' component='p' fontWeight='bolder'>
                    Total Farmers
                  </Typography>
                </div>
                <img style={{ height: "5rem" }} src={farmer} alt='cool' />
              </Paper>
            </Grid>
            <Grid item sx={{ cursor: "pointer" }} lg={4}>
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
                <img style={{ height: "5rem" }} src={completeimg} alt='cool' />
              </Paper>
            </Grid>
            <Grid item sx={{ cursor: "pointer" }} lg={4}>
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
