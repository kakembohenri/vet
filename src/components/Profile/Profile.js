import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Paper, Rating, TextField, Box, Modal } from "@mui/material";
import Navbar from "../Landing/Navbar/Navbar";
import Reviews from "./Reviews";
import Search from "../Search/Search";
import Categories from "../Home/Categories/Categories";
import ScheduleCalendar from "./ScheduleCalendar";
import {
  LocationOn,
  Verified,
  SendRounded,
  Phone,
  Agriculture,
  LocalHospital,
  Email,
  ReportOutlined,
  SearchRounded
} from "@mui/icons-material";
import {
  banner,
  detailsContainer,
  personalContainer,
  personalItem,
  bio,
  ratingContainer,
  containerRight,
  reportContainer,
  searchBox,
  inputSearch,
  resultsContainer,
  result
} from "./styles";
import blank from "../../components/images/download.png";
import { useSelector, useDispatch } from "react-redux";
import {
  getprofile,
  retrievechats,
  getallchats,
  report,
  logout,
  searchservices
} from "../../actions/profile";
import AlertBox from "../Alert/Alert";

const Profile = () => {
  const [select, setSelect] = useState(false);
  const [search, setSearch] = useState("")
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false)
  const { profile } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getprofile(id));
    dispatch(getallchats(id));
  }, [id, dispatch]);

  const onClick = () => {
    if (auth?.user?._doc?.farmer) {
      dispatch(retrievechats(auth?.user?._doc?.farmer, id));
      return navigate(`/inbox/${auth?.user?._doc?.farmer}`);
    } else if (auth?.user?._doc?.vet)
      dispatch(retrievechats(auth?.user?._doc?.vet, id));
    return navigate(`/inbox/${auth?.user?._doc?.vet}`);
  };

  const Report = () => {
    setSelect(false);
    dispatch(report(auth.profile._doc.vet, text));
  };

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onChange = (e) => {
    setSearch(e.target.value);

    if (search !== "") {
      dispatch(searchservices(search));
    }
  };
  return (
    <div>
      {auth?.isSuspended ? (
        <div>
          <Typography>
            <Button variant='contained' onClick={() => dispatch(logout(navigate))}>Logout</Button>
            Your account has been suspended
          </Typography>
        </div>
      ) : (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Paper sx={reportContainer} elevation={3}>
          <TextField
            label='What is the matter?'
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            sx={{
              display: "flex",
              width: "center",
              background: "crimson",
              color: "#fff",
              margin: "0rem 0.5rem",
              "&:hover": {
                bgcolor: "red",
              },
            }}
            variant='contained'
            onClick={Report}>
            Report
          </Button>
        </Paper>
      </Modal>
      <AlertBox />
      <Navbar user={auth} />
      
      <div style={{ display: 'flex' }}>

      <Paper style={detailsContainer} elavation={10}>
      <div style={banner}>
        {profile?._doc?.vet && (
        <div style={{ height: "8rem", width: "8rem" }}>
          <img
            style={{ height: "100%", width: "100%", borderRadius: "100%" }}
            src={profile?._doc?.profile_pic ? profile?._doc?.profile_pic : blank}
            alt='banner'
          />
        </div>
        )}
        {profile?._doc?.farmer && (
        <div style={{ height: "8rem", width: "8rem" }}>
          <img
            style={{ height: "100%", width: "100%", borderRadius: "100%" }}
            src={blank}
            alt='banner'
          />
        </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "1rem 0rem",
          }}>
          <Typography
            style={{ margin: "0rem 0.5rem" }}
            variant='body2'
            component='h5'>
            {profile?._doc?.name?.map((item, index) => (
              <span key={index}>{item} </span>
            ))}
          </Typography>
          {profile?._doc?.isVerified && (
            <Verified sx={{ color: "blue" }} />
          )}
        </div>
        {profile._doc.vet && (
          <div style={ratingContainer}>
            <div style={ratingContainer}>
              <Rating
                value={profile._doc.rating}
                precision={0.25}
                readOnly
                size='large'
              />
              <Typography
                variant='subtitle1'
                component='p'
                sx={{ margin: "0rem 0.3rem" }}>
                {profile._doc.rating}
              </Typography>
            </div>
          </div>
        )}
      </div>
        <div style={personalContainer}>
          <div style={personalItem}>
            {!profile._doc.vet ? (
              <>
                <Agriculture sx={{ color: "black" }} />
                <Typography
                  variant='body1'
                  component='p'
                  sx={{ margin: "0rem 0.5rem" }}>
                  {profile._doc.farm_name}
                </Typography>
              </>
            ) : (
              <>
                <LocalHospital sx={{ color: "black" }} />
                <Typography
                  variant='body1'
                  component='p'
                  sx={{ margin: "0rem 0.5rem" }}>
                  {profile._doc.clinic}
                </Typography>
              </>
            )}
          </div>
          <div style={personalItem}>
            <LocationOn sx={{ color: "black" }} />
            <Typography
              variant='body1'
              component='p'
              sx={{ margin: "0rem 0.5rem" }}>
              {profile._doc.location.name}
            </Typography>
          </div>
          <div style={personalItem}>
            <Phone sx={{ color: "black" }} />
            {!profile._doc.vet ? (
              <Typography
                variant='body1'
                component='p'
                sx={{ margin: "0rem 0.5rem" }}>
                {profile.contact[0]["phone_number"]}
              </Typography>
            ) : (
              <Typography
                variant='body1'
                component='p'
                sx={{ margin: "0rem 0.5rem" }}>
                {profile._doc.contacts.phone_number}
              </Typography>
            )}
          </div>
          {profile._doc.vet && (
            <div style={personalItem}>
              <Email sx={{ color: "black" }} />
              <Typography
                variant='body1'
                component='p'
                sx={{ margin: "0rem 0.5rem" }}>
                {profile.contact[0]["email"]}
              </Typography>
            </div>
          )}
        </div>
        {!profile._doc.farmer && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <Typography variant='body2' component='p'>
              <span style={{ fontWeight: "bolder" }}>Years of experience:</span>{" "}
              {profile._doc.experience} years
            </Typography>
          </div>
        )}
        <div style={containerRight}>
          {auth.profile._doc._id !== auth.user._doc._id && (
            <>
              <Button
                sx={{
                  display: "flex",
                  width: "center",
                  background: "crimson",
                  color: "#fff",
                  margin: "0rem 0.5rem",
                  "&:hover": {
                    bgcolor: "red",
                  },
                }}
                variant='contained'
                onClick={handleOpen}>
                Report
                <ReportOutlined />
              </Button>
              {/* {select && (
                <Paper sx={reportContainer} elevation={3}>
                  <TextField
                    label='What is the matter?'
                    multiline
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Button
                    sx={{
                      display: "flex",
                      width: "center",
                      background: "crimson",
                      color: "#fff",
                      margin: "0rem 0.5rem",
                      "&:hover": {
                        bgcolor: "red",
                      },
                    }}
                    variant='contained'
                    onClick={Report}>
                    Report
                  </Button>
                </Paper>
              )} */}
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "hotpink",
                  color: "#fff",
                  margin: "0rem 0.5rem",
                  "&:hover": {
                    bgcolor: "deeppink",
                  },
                }}
                variant='contained'
                onClick={onClick}>
                Message <SendRounded />
              </Button>
            </>
          )}
        </div>
      </Paper>
      <Box sx={{ height: '100vh', width:'100%', overflowY: 'scroll' }}>
        {profile?._doc?.farmer !== null && (
        <div style={{ position: "relative", margin: "6rem 0rem" }}>
          <Box style={searchBox}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                sx={inputSearch}
                type='search'
                placeholder='Search for vet services'
                value={search}
                onChange={onChange}
              />
              <SearchRounded sx={{ color: "deepink" }} />
            </div>
            <Categories />
          </Box>
          <Search search={search} container={resultsContainer} item={result} />
        </div>

        )}
        <Paper style={bio} elavation={2}>
          <Typography
            variant='h4'
            component='h3'
            sx={{
              paddingBottom: "0.3rem",
              borderBottom: "0.3rem solid green",
              width: "fit-content",
            }}>
            {!profile._doc.vet ? "Farm description" : "Services Rendered"}
          </Typography>
          {!profile._doc.vet ? (
            <Typography
              variant='body1'
              component='span'
              sx={{ margin: "1rem 0rem" }}>
              {profile._doc.animals_kept.map((item, index) =>
                profile._doc.animals_kept.slice(-1)[0] === item ? (
                  <span key={index}>{item}</span>
                ) : (
                  <span key={index}>{item}, </span>
                )
              )}
            </Typography>
          ) : (
            <Typography
              variant='body1'
              component='p'
              sx={{ margin: "1rem 0rem" }}>
              {profile._doc.services.map((item, index) =>
                profile._doc.services.slice(-1)[0] === item ? (
                  <span key={index}>{item} </span>
                ) : (
                  <span key={index}>{item}, </span>
                )
              )}
            </Typography>
          )}
        </Paper>
        <ScheduleCalendar profile={profile} />
        {profile._doc.vet && <Reviews auth={auth} />}

      </Box>
      </div>
    </div>
)}
</div>
  );
};
export default Profile;
