import { Typography } from "@mui/material"
import { Facebook, Twitter, Phone } from "@mui/icons-material"
import {mainContainer} from './styles'

const Contact = () => {
  return (
    <div id="contact">
        <div style={mainContainer}>
        <Typography color='black' style={{textAlign: 'center', fontWeight: '700', fontSize: '2rem'}}  variant='h4' component='p'>
          <small style={{ color: "lightgreen" }}>i</small>V
          <span style={{ color: "lightgreen" }}>e</span>t
        </Typography>
           <div style={{display: 'flex', width: '20%', justifyContent: 'space-around'}}>
            <Facebook />
            <Twitter />
            <div style={{display: 'flex'}}>
              <Phone />
              <Typography>
                0728926574
              </Typography>
            </div>
           </div>
        </div>
    </div>
  )
}
export default Contact