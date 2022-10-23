import NavbarAdmin from "../Navbar/NavbarAdmin";
import { Typography, Button } from "@mui/material";
import { Help } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { header, headerContainer, reports } from "./styles";

const Generate = () => {
  const reports = useSelector((state) => state.profile);

  console.log(reports);
  return (
    <div>
      <NavbarAdmin />
      <div style={{ marginLeft: "15rem", marginRight: "3rem" }}>
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
    </div>
  );
};
export default Generate;
