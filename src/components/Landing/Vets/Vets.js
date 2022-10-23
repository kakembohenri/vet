import { Avatar, Typography, Box, Rating, Paper } from "@mui/material"
import {Link} from 'react-router-dom'
import {LocationOn, Verified, LocalHospital} from "@mui/icons-material"

const Vets = ({ vets }) => {
    console.log(vets)
  return (
    <div style={{ margin: '2rem 0rem'}} id='vets'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>

        <Typography variant='h3' component='h4' style={{ padding:'0.3rem', borderBottom: '0.3rem solid green' }}>Browse some of the best vets</Typography>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {vets?.result?.sort((a,b) => parseFloat(b.rating) - parseFloat(a.rating)).map((item, index) => 
        
        <Paper key={index} elevation={5} style={{ padding: '1rem', width: '30%', margin: '1rem 0rem' }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "0.4rem 0rem",
        flexWrap: "wrap",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        >
        <Avatar src={item.profile_pic} />
        <Typography
          variant='body1'
          component='p'
          sx={{
            margin: "0rem 0.5rem",
            padding: "0.3rem 0rem",
            display: "flex",
            alignItems: "center",
          }}>
          {item?.name[0][0].toUpperCase()}
          {item?.name[0].slice(1)}{" "}
          {item?.name[1][0].toUpperCase()}
          {item?.name[1].slice(1)}
          {item?.isVerified && (
              
              <Verified sx={{ color: "blue" }} />
          )}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Typography
          variant='body1'
          component='p'
          sx={{
            margin: "0rem 0.5rem",
            padding: "0.3rem 0rem",
            display: "flex",
          }}>
          <LocationOn sx={{ color: "black" }} />
          {item.location.name}
        </Typography>
        <Typography
          variant='body1'
          component='p'
          sx={{
            margin: "0rem 0.5rem",
            padding: "0.3rem 0rem",
            display: "flex",
          }}>
          <LocalHospital sx={{ color: "black" }} />
          {item.clinic}
        </Typography>
        <Typography
          variant='body1'
          component='p'
          sx={{
            margin: "0rem 0.5rem",
            padding: "0.3rem 0rem",
            display: "flex",
          }}>
         
        </Typography>
      </div>
    </div>
    <Typography
      variant='body1'
      component='span'
      sx={{ margin: "0rem 0.5rem", padding: "0.3rem 0rem" }}>
      <Typography
        variant='body1'
        component='p'
        sx={{
          margin: "0.8rem 0rem",
          paddingBottom: "0.1rem",
          width: "fit-content",
          borderBottom: "0.3rem solid green",
        }}>
        Services Rendered
      </Typography>
      {item?.services.map((service, index) => (
        <span key={index}>
          {service}
          {item?.services.slice(-1).toString() ===
          service
            ? ""
            : ", "}
        </span>
      ))}
    </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0.8rem 0rem",
      }}>
      <Typography variant='body2' component='p'>
        <span style={{ fontWeight: "bolder" }}>
          Years of experience:
        </span>{" "}
        {item?.experience} years
      </Typography>
      <Typography
        sx={{ display: "flex", alignItems: "center" }}
        variant='caption'
        component='span'>
        <Rating
          value={Number(item.rating)}
          size='large'
          precision={0.25}
          readOnly
        />
        <span style={{ fontSize: "1rem" }}>
          {item.rating}
        </span>
      </Typography>
    </Box>
        </Paper>

        )}
       
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '90%'}}>
        <Link style={login_btn} to='/login'>View more</Link>

        </div>
  </div>
  )
}

const login_btn = {
    textDecoration: 'none',
    color: 'white',
    background: 'hotpink',
    padding: '0.8rem',
    borderRadius: '0.5rem',
    fontFamily: 'sans-serif'
}
export default Vets