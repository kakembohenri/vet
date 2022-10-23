import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Landing/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Avatar, Rating, Box, Paper } from "@mui/material";
import {
  Verified,
  LocationOn,
  LocalHospital,
  SocialDistanceOutlined,
} from "@mui/icons-material";
import { fetchservices } from "../../actions/auth";
import { getvetprofile } from "../../actions/profile";
import { header, servicesContainer } from "./styles";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const category = useParams().name;
  const service = useParams().service;

  useEffect(() => {
    dispatch(fetchservices(service));
  }, [dispatch, service]);

  const getProfile = (id) => {
    dispatch(getvetprofile(id, navigate));
  };

  return (
    <div>
      <Navbar user={auth} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "4rem 2rem",
        }}>
        <div>
          <Typography sx={header} variant='h3' component='h2'>
            {category}
          </Typography>
          <Typography
            sx={{
              marginLeft: "1rem",
              paddingBottom: "0.3rem",
              borderBottom: "0.3rem solid green",
              width: "fit-content",
            }}
            variant='h3'
            component='h2'>
            {service}
          </Typography>
        </div>
        <div style={servicesContainer}>
          {auth?.services?.length > 0 ? (
            auth?.services
              ?.sort(
                (a, b) =>
                  parseFloat(a.service.distance) -
                  parseFloat(b.service.distance)
              )
              ?.map((item, index) => (
                <Paper
                  key={index}
                  elevation={5}
                  sx={{ width: "40%", padding: "1rem", margin: "1rem 0rem" }}>
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
                      onClick={() => getProfile(item?.service?._doc?.vet)}>
                      <Avatar src={item?.service?._doc?.profile_pic} />
                      <Typography
                        variant='body1'
                        component='p'
                        sx={{
                          margin: "0rem 0.5rem",
                          padding: "0.3rem 0rem",
                          display: "flex",
                          alignItems: "center",
                        }}>
                        {item?.service?._doc?.name[0][0].toUpperCase()}
                        {item?.service?._doc?.name[0].slice(1)}{" "}
                        {item?.service?._doc.name[1][0].toUpperCase()}
                        {item?.service?._doc.name[1].slice(1)}
                        {item?.service?._doc.isVerified && (
                          <Verified sx={{ color: "blue" }} />
                        )}
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
                        {item.service?._doc?.location?.name}
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
                        {item?.service?._doc?.clinic}
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
                        {item.service?.distance.toFixed(2)} Km
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
                    {item.service?._doc.services.map((service, index) => (
                      <span key={index}>
                        {service}
                        {item.service?._doc.services.slice(-1).toString() ===
                        service
                          ? ""
                          : ", "}
                      </span>
                    ))}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "0.8rem 0rem",
                    }}>
                    <Typography variant='body2' component='p'>
                      <span style={{ fontWeight: "bolder" }}>
                        Years of experience:
                      </span>{" "}
                      {item.service?._doc.experience} years
                    </Typography>
                    <Typography
                      sx={{ display: "flex", alignItems: "center" }}
                      variant='caption'
                      component='span'>
                      <Rating
                        value={item.service?._doc.rating}
                        size='large'
                        precision={0.25}
                        readOnly
                      />
                      <span style={{ fontSize: "1rem" }}>
                        {item.service?._doc.rating}
                      </span>
                    </Typography>
                  </Box>
                </Paper>
              ))
          ) : (
            <Typography>No vets serving these services</Typography>
          )}
        </div>
      </div>
    </div>
  );
};
export default Categories;
