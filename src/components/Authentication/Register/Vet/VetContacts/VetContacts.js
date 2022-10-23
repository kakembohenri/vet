import { Typography, Paper } from "@mui/material";
import { registerContainer, formContainer } from "./styles";
import Form from "./Form";
import FormImg from "../../../../images/FormImg";

const VetContacts = () => {
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
          Finish up your profile
        </Typography>
        <Paper style={formContainer} elevation={4}>
          <Form />
        </Paper>
      </div>
    </>
  );
};

export default VetContacts;
