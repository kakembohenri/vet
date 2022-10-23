import { Button, Typography } from "@mui/material";
import {
  homeContainer,
  backdrop,
  detailsContainer,
  detailsText,
  imageContainer,
  image
} from "./styles";
import Farmer from "../../images/farmer.jpeg"
import Vet from "../../images/dr1.jpg"

const Home = () => {
  return (
    <div style={homeContainer} id='home'>
      <div style={backdrop}></div>
      <div style={imageContainer} className='slider'>
      <img src={Farmer} style={image} alt='farmer' />
      <img src={Vet} style={{ width:'100%' }} alt='vet' />
      <img src={Farmer} style={image} alt='farmer' />

      </div>
      <div style={detailsContainer}>
        <Typography style={detailsText} variant='h3' component='p'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem autem
          dolor, veniam temporibus beatae consequuntur!
        </Typography>
        <a
          style={{ textDecoration: "none", margin: "1rem 0rem" }}
          href='#about'>
          <Button
            variant='contained'
            sx={{
              padding: "0.3rem",
              backgroundColor: "hotpink",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "deeppink",
              },
              color: "color",
              margin: "0rem 0.8rem",
            }}>
            Learn more
          </Button>
        </a>
      </div>
    </div>
  );
};
export default Home;
