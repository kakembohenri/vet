import { Typography } from "@mui/material"
import {mainContainer} from './styles'

const Contact = () => {
  return (
    <div id="contact">
        <div style={mainContainer}>
            <Typography variant="body1" component='p'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ipsam.
            </Typography>
            <Typography variant='subtitle1' component='p'>
                company &copy; 2022
            </Typography>
        </div>
    </div>
  )
}
export default Contact