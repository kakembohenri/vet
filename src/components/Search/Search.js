import { Box, Typography, Paper, Rating, Avatar } from "@mui/material";
import {
  LocationOn,
  Verified,
  LocalHospital,
  SocialDistanceOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getvetprofile } from "../../actions/profile";

const Search = ({ search, container, item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const result = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);

  const getProfile = (id) => {
    dispatch(getvetprofile(id, navigate));
  };

  return (
    search !== "" && (
      <Box style={container}>
        <Paper style={item} elevation={5}>
          {!result?.searchServices?.length > 0 ? (
            <Typography>
              No results for{" "}
              <b>
                "<i>{search}</i>"
              </b>
            </Typography>
          ) : (
            result?.searchServices?.sort((a,b) => parseFloat(a.service.distance) - parseFloat(b.service.distance)).map(
            // result?.searchServices?.map(
              (item, index) =>
                item?.service?._doc?.vet !== auth?.user?.service?._doc?.vet && (
                  <div key={index} style={{ margin: '2rem 0rem', border: "1px solid" }}>
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
                          {item.service?._doc.location.name}
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
                          {item.service?._doc.clinic}
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
                  </div>
                )
            )
          )}
        </Paper>
      </Box>
    )
  );
};
export default Search;
