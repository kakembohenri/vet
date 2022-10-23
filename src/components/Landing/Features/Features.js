import { useState } from "react";
import { Typography, Paper } from "@mui/material";
import { container, header, features, featureItem } from "./styles";
import farmer from "../../images/farmer.jpeg";
import vet from "../../images/vet.jpeg";
import calendar from "../../images/calendar.jpeg";
import "./styles.css";

const Features = () => {
  const [isFeatures, setIsFeatures] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 1442) {
      setIsFeatures(true);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div style={container} id='features'>
      <Typography style={header} variant='h3' component='h1'>
        Features
      </Typography>
      <div
        style={features}
        className={isFeatures ? "feature-box" : "not-active"}>
        <Paper style={featureItem} className='feature-item' elevation={3}>
          <img style={{ height: "100%", width: "100%" }} src={farmer} alt='' />
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus, voluptatum.
          </Typography>
        </Paper>
        <Paper style={featureItem} className='feature-item' elevation={3}>
          <img style={{ height: "100%", width: "100%" }} src={vet} alt='' />
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus, voluptatum.
          </Typography>
        </Paper>
        <Paper style={featureItem} className='feature-item' elevation={3}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={calendar}
            alt=''
          />
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus, voluptatum.
          </Typography>
        </Paper>
      </div>
    </div>
  );
};
export default Features;
