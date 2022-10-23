import { Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { registerContainer, formContainer } from "./styles";
import Form from "./Form";
import FormImg from "../../../../images/FormImg";

const CreateAccount = () => {
  return (
    <>
      <FormImg />
      <div style={registerContainer}>
      <Link style={{ color: 'black', textDecoration: 'none'}} to='/'>
        <Typography
          style={{ margin: "1rem 0rem" }}
          fontWeight={700}
          variant='h4'
          component='p'>
          <span style={{ color: "lightgreen" }}>!</span>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
        </Link>
        <Typography style={{ margin: "1rem 0rem" }} variant='h4' component='h3'>
          Create Farmer Account
        </Typography>
        <Paper style={formContainer} elevation={4}>
          <Form />
        </Paper>
      </div>
    </>
  );
};

export default CreateAccount;
