import { useEffect, useState } from "react";
import {
  Paper,
  Container,
  Typography,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import vet from "../../components/images/download.png";
import { banner, ratingContainer, reviewContainer } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { getvetToRate } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { rateuser } from "../../actions/profile";

const Review = () => {
  const navigate = useNavigate();
  const { rateUser } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    rating: 0,
    text: "",
  });

  const onSubmit = () => {
    dispatch(rateuser(rateUser._id, formData, navigate));
  };

  const { rating, text } = formData;

  // console.log(rateUser);
  useEffect(() => {
    dispatch(getvetToRate(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Paper style={banner} elevation={5}>
        <div style={{ height: "10rem", width: "10rem", borderRadius: "10rem" }}>
          <img
            style={{ height: "100%", width: "100%", borderRadius: "100%" }}
            src={rateUser ? rateUser?.profile_pic : vet}
            alt='banner'
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "1rem 0rem",
          }}>
          <Typography
            style={{ margin: "0rem 0.5rem" }}
            variant='h5'
            component='h3'>
            How do you rate your experience with {rateUser?.name[0]}{" "}
            {rateUser?.name[1]}
          </Typography>
        </div>
        <div style={ratingContainer}>
          <div style={ratingContainer}>
            <Rating
              value={rating}
              precision={0.5}
              onChange={(e) =>
                setFormData({ ...formData, rating: Number(e.target.value) })
              }
              size='large'
            />
            <span style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
              {rating}
            </span>
          </div>
        </div>
      </Paper>
      <Paper sx={reviewContainer} elevation={5}>
        <Typography
          sx={{ margin: "0.4rem 0rem", width: "fit-content" }}
          variant='h4'
          component='h3'>
          Please write about your experience here
        </Typography>
        <TextField
          label='Review'
          sx={{ margin: "0.8rem 0rem", width: "40%" }}
          multiline
          value={text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        />
        <Button
          onClick={onSubmit}
          sx={{
            margin: "1rem 0rem",
            width: "20%",
            background: "#1976d2",
            color: "white",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "blue",
            },
          }}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
};
export default Review;
