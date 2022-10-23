import Navbar from "../../Landing/Navbar/Navbar";
import { useSelector } from "react-redux";
import { Typography, Avatar, Rating, Box, Paper } from "@mui/material";
import {
  SocialDistanceOutlined,
  Verified,
  LocationOn,
  LocalHospital,
} from "@mui/icons-material";

const Cattle = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <Navbar user={auth} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "4rem 0rem",
        }}>
        <Paper elevation={5} sx={{ width: "40%", padding: "1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0.4rem 0rem",
              flexWrap: "wrap",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => console.log("hey")}>
              <Avatar />
              <Typography
                variant='body1'
                component='p'
                sx={{
                  margin: "0rem 0.5rem",
                  padding: "0.3rem 0rem",
                  display: "flex",
                  alignItems: "center",
                }}>
                hey, hey
                <Verified sx={{ color: "blue" }} />
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}>
              <Typography
                variant='body1'
                component='p'
                sx={{
                  margin: "0rem 0.5rem",
                  padding: "0.3rem 0rem",
                  display: "flex",
                }}>
                <LocationOn sx={{ color: "black" }} />
                wandegeya
              </Typography>
              <Typography
                variant='body1'
                component='p'
                sx={{
                  margin: "0rem 0.5rem",
                  padding: "0.3rem 0rem",
                  display: "flex",
                }}>
                <LocalHospital sx={{ color: "black" }} />
                hey
              </Typography>
              <Typography
                variant='body1'
                component='p'
                sx={{
                  margin: "0rem 0.5rem",
                  padding: "0.3rem 0rem",
                  display: "flex",
                }}>
                <SocialDistanceOutlined sx={{ color: "black" }} />
                100 Km
              </Typography>
            </div>
          </div>
          <Typography
            variant='body1'
            component='span'
            sx={{ margin: "0rem 0.5rem", padding: "0.3rem 0rem" }}>
            <Typography
              variant='body1'
              component='p'
              sx={{
                margin: "0.8rem 0rem",
                paddingBottom: "0.1rem",
                width: "fit-content",
                borderBottom: "0.3rem solid green",
              }}>
              Services Rendered
            </Typography>
            hey
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "0.8rem 0rem",
            }}>
            <Typography variant='body2' component='p'>
              <span style={{ fontWeight: "bolder" }}>Years of experience:</span>{" "}
              10 years
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant='caption'
              component='span'>
              <Rating value={5} size='large' precision={0.25} readOnly />
              <span style={{ fontSize: "1rem" }}>5</span>
            </Typography>
          </Box>
        </Paper>
      </div>
    </div>
  );
};
export default Cattle;
