import { Typography } from "@mui/material";
import { iconBox } from "../styles";

const CompleteTable = () => {
  return (
    <div>
      <div style={iconBox}>
        <Typography color='black' fontWeight={700} variant='h4' component='p'>
          <small style={{ color: "lightgreen" }}>i</small>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
      </div>
      <div>
        <Typography>Report on </Typography>
      </div>
    </div>
  );
};
export default CompleteTable;
