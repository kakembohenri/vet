import { Typography, Paper } from "@mui/material";
import { registerContainer, formContainer } from "./styles";
import FormImg from "../../../../images/FormImg";

const VerifyEmail = () => {
  return (
    <>
      <FormImg />
      <div style={registerContainer}>
        <Typography
          style={{ margin: "1rem 0rem" }}
          fontWeight={700}
          variant='h4'
          component='p'>
          <span style={{ color: "lightgreen" }}>!</span>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
        <Typography style={{ margin: "1rem 0rem" }} variant='h4' component='h3'>
          Enter code sent to your phone
        </Typography>
        <Paper style={formContainer} elevation={4}>
          <Typography>
            Check your email address to verify your account
          </Typography>
        </Paper>
      </div>
    </>
  );
};

export default VerifyEmail;
