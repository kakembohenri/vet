import { Link } from "react-router-dom";
import { Typography, Paper, Grid } from "@mui/material";
import bkg1 from '../../images/bkg1.jpeg'

import { container, header, joinUs, joinUsBtn, backdrop, fixed } from "./styles";

const About = () => {
  return (
    <div style={container} id='about'>
      <div style={fixed}>

      <div style={backdrop}></div>
    <img style={{ height: '100%', width: '100%'}} src={bkg1} alt='bkg pic' />
      </div>
      <div style={{ zIndex: '100', marginTop: '4rem'}}>
      <Typography color='black' style={{textAlign: 'center', fontWeight: '700', fontSize: '4rem'}}  variant='h4' component='p'>
          <small style={{ color: "lightgreen" }}>i</small>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
      <Typography style={header} variant='h3' component='h1'>
        Categories of services
      </Typography>

      </div>
      <Grid container sx={{ justifyContent: "center", zIndex: '1000' }} spacing={3}>
        <Grid item xl={3} className='card card1'>
          <Paper sx={{ padding: "2rem", position: 'relative',  background: 'green', color: 'white' }} elevation={5} >
            <Typography
              variant='h4'
              sx={{ marginBottom: "1rem" }}
              component='h3'>
              Clinical Services
            </Typography>
            <ul className='slide slide-up1'>
              <li>Clinical diagnosis</li>
              <li>Opthalmic surgeries</li>
              <li>Dental surgeries</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xl={3} className='card card2'>
          <Paper sx={{ padding: "2rem", position: 'relative',  background: 'green', color: 'white' }} elevation={5}>
            <Typography
              variant='h4'
              sx={{ marginBottom: "1rem" }}
              component='h3'>
              Preventive services
            </Typography>
            <ul className='slide slide-up2'>
              <li>Preventive Healthcare</li>
              <li>Castration</li>
              <li>Artificial Insemination</li>
              <li>Health status examination</li>
              <li>Vaccination</li>
              <li>Spraying</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xl={3} className='card card3'>
          <Paper sx={{ padding: "2rem", position: 'relative',  background: 'green', color: 'white' }} elevation={5}>
            <Typography
              variant='h4'
              sx={{ marginBottom: "1rem" }}
              component='h3'>
              Medication
            </Typography>
            <ul className="slide slide-up3">
              <li>Administer Prescribed drugs</li>
              <li>Diagnose Illnesses</li>
              <li>Wound Dressing</li>
              <li>Prescribe Medication</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
      <div style={joinUs}>
        <Typography style={{margin: '1rem 0rem', color: 'white'}}>
          For more
        </Typography>
        <Link style={joinUsBtn} to='/choose-user'>Join us Here</Link>
      </div>
    </div>
  );
};
export default About;
