import { Typography, Button } from "@mui/material";
import { Help } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { header, headerContainer, iconBox } from "./styles";

const Generate = () => {
  const reports = useSelector((state) => state.profile);

  return (
    <div>
      <div style={iconBox}>
        <Typography color='black' fontWeight={700} variant='h4' component='p'>
          <small style={{ color: "lightgreen" }}>i</small>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
      </div>
      <div style={headerContainer}>
        <Typography style={header} variant='h4' component='h1'>
          Generate Reports
        </Typography>
        <Typography
          sx={{
            display: "flex",
            backgroundColor: "lightpink",
            padding: "0.5rem",
            margin: "0rem 2rem",
            borderRadius: "1rem",
          }}
          variant='body1'
          component='h4'>
          <Help sx={{ color: "deeppink", marginRight: "0.8rem" }} />
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
      </div>
      <div style={reports}>
        <Button
          variant='contained'
          sx={{ background: "hotpink", "&:hover": { bgcolor: "deeppink" } }}>
          Today
        </Button>
        <Button
          variant='contained'
          sx={{ background: "hotpink", "&:hover": { bgcolor: "deeppink" } }}>
          This week
        </Button>
        <Button
          variant='contained'
          sx={{ background: "hotpink", "&:hover": { bgcolor: "deeppink" } }}>
          This Month
        </Button>
        <Button
          variant='contained'
          sx={{ background: "hotpink", "&:hover": { bgcolor: "deeppink" } }}>
          This Year
        </Button>
      </div>
    </div>
  );
};
export default Generate;
