import { useState, useEffect } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import {
  TextField,
  Typography,
  Paper,
  Button,
  Avatar,
  Rating,
} from "@mui/material";
import { Search, Verified } from "@mui/icons-material";
import {
  action,
  paperEdit,
  header,
  personalDetails,
  avatarContainer,
  subContainer,
  subContainer2,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { searchvets, clearsearch, adminverify} from "../../../actions/profile";
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [vets, setVets] = useState(null);
  const results = useSelector((state) => state.profile);

  const searchVet = (e) => {
    setSearch(e.target.value);

    if (search !== "") {
      dispatch(searchvets(search));
    }else{
      dispatch(clearsearch())
    }
  };


  useEffect(() => {
    let newArr = results?.searchResults?.map((item) => JSON.stringify(item));

    let final = newArr
      ?.filter((item, index) => newArr?.indexOf(item) === index)
      ?.map((item) => JSON?.parse(item));

    setVets(final);
  }, [results?.searchResults]);

  const investigate = (item) => {
    // console.log(item);
    navigate(`/admin/reports/${item?.vet?.vet}`);
  };

  return (
    <div>
      <NavbarAdmin />
      <div style={{ marginLeft: "15rem", marginRight: "3rem" }}>
        <Typography style={header} variant='h4' component='h1'>
          Manage Vets
        </Typography>
        <div style={action}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              type='search'
              placeholder='Search for vet'
              onChange={searchVet}
            />
            <Search sx={{ color: "blue", margin: "0rem 0.8rem" }} />
          </div>
        </div>
        <Typography>
          Search results for{" "}
          <i>
            <b>"{search}"</b>
          </i>
        </Typography>
        {vets?.length > 0 &&
          vets?.map((item, index) => (
            <Paper key={index} style={paperEdit} elevation={3}>
              <div style={personalDetails}>
                <div style={avatarContainer}>
                  <Avatar src={item?.vet?.profile_pic} />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                        <span>{item?.vet?.name[0]} </span>
                        <span>{item?.vet?.name[1]} </span>
                        <span>{item?.vet?.name[2]} </span>
                    </div>
                    {item?.vet?.isVerified && (
                      <Verified sx={{ color: "blue" }} />
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      value={Number(item?.vet?.rating)}
                      precision={0.25}
                      readOnly
                    />
                    <Typography marginLeft='0.4rem'>
                      {item?.vet?.rating}
                    </Typography>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={subContainer}>
                    <Typography component='span'>
                      <b>Experience:</b>
                      <Typography>{item?.vet?.experience} years</Typography>
                    </Typography>
                    <Typography component='span'>
                      <b>Vet Clinic:</b>
                      <Typography>{item?.vet?.clinic}</Typography>
                    </Typography>
                  </div>
                  <div style={subContainer}>
                    <Typography component='span'>
                      <b>Location:</b>
                      <Typography>{item?.vet?.location?.name}</Typography>
                    </Typography>
                    <Typography component='span'>
                      <b>Contact:</b>
                      <Typography>
                        {item?.vet?.contacts?.phone_number}
                      </Typography>
                    </Typography>
                  </div>
                </div>
              </div>
              <div style={subContainer2}>
                <div style={{ margin: "0rem 1rem" }}>
                  <Typography component='span'>
                    <b>Reviews:</b>
                    <Typography sx={{ fontSize: "2rem", fontWeight: "500" }}>
                      {item?.reviews}
                    </Typography>
                  </Typography>
                  <Typography component='span'>
                    <b>Schedules created:</b>
                    <Typography sx={{ fontSize: "2rem", fontWeight: "500" }}>
                      {item?.schedules?.length}
                    </Typography>
                  </Typography>
                </div>
                <div style={{ margin: "0rem 1rem" }}>
                  <Typography component='span'>
                    <b>Schedules completed:</b>
                    <Typography sx={{ fontSize: "2rem", fontWeight: "500" }}>
                      {
                        item?.schedules?.filter(
                          (item) => item.status === "complete"
                        )?.length
                      }
                    </Typography>
                  </Typography>
                  <Typography component='span'>
                    <b>Schedules canceled:</b>
                    <Typography sx={{ fontSize: "2rem", fontWeight: "500" }}>
                      {
                        item?.schedules?.filter(
                          (item) => item.status === "cancel"
                        ).length
                      }
                    </Typography>
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                <Typography style={{ margin: "0.8rem 0rem" }} component='span'>
                  <b>Services rendered:</b>
                  <Typography>
                    {item?.vet?.services?.map((item, index) =>
                      item?.vet?.slice(-1)[0] === item ? (
                        <span key={index}>{item} </span>
                      ) : (
                        <span key={index}>{item}, </span>
                      )
                    )}
                  </Typography>
                </Typography>
                <Typography style={{ margin: "0.8rem 0rem" }} component='span'>
                  <b>Report cases:</b>
                  <Typography sx={{ fontSize: "2rem", fontWeight: "500" }}>
                    {item?.reports?.length}
                  </Typography>
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}>
                {!item?.vet?.isVerified && (
                  <Button
                    sx={{
                      margin: "0rem 0.4rem",
                      background: "hotpink",
                      color: "#fff",
                      "&:hover": { cursor: "pointer", background: "hotpink" },
                    }}
                    title='verify user' onClick={() => dispatch(adminverify(item?.vet?.vet, navigate))}>
                    Verify User
                  </Button>
                )}
                {item?.reports?.length > 0 && (
                  <Button
                    sx={{
                      margin: "0rem 0.4rem",
                      background: "crimson",
                      color: "#fff",
                      "&:hover": { cursor: "pointer", background: "crimson" },
                    }}
                    title='Invetsigate Account'
                    onClick={() => investigate(item)}>
                    Investigate account
                  </Button>
                )}
              </div>
            </Paper>
          ))}
      </div>
    </div>
  );
};
export default User;
