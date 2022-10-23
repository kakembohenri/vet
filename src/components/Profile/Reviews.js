import { Paper, Typography, Rating, Divider } from "@mui/material";
import { bio, reviewContainer, review } from "./styles";

const Reviews = ({ auth }) => {
  return (
    <Paper style={bio} elevation={5}>
      <Typography
        variant='h4'
        component='h3'
        sx={{
          paddingBottom: "0.3rem",
          borderBottom: "0.3rem solid green",
          width: "fit-content",
        }}>
        Reviews
      </Typography>
      <div style={reviewContainer}>
        {auth?.reviews && !auth?.reviews?.length > 0 ? (
          <Typography>No reviews found</Typography>
        ) : (
          auth?.reviews?.map((item, index) => (
            <div key={index} style={review}>
              {/* <div>
            <Avatar />
            <Typography variant='body2' component='p'>
              Name
            </Typography>
          </div> */}
              <div style={{ width: "70%" }}>
                <Typography variant='body2' component='p'>
                  {item.text}
                </Typography>
                <div style={{ margin: "0.6rem 0rem" }}>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    variant='body1'
                    component='span'>
                    <Rating size='small' value={Number(item.rating)} readOnly />
                    {item.rating}
                  </Typography>
                  <Divider sx={{ backgroundColor: "#454545" }} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Paper>
  );
};
export default Reviews;
