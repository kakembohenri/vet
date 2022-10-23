import { Typography } from "@mui/material"
import { container, header } from "./styles"

const About = () => {
  return (
    <div style={container} id='about'>
        <Typography style={header} variant="h3" component='h1'>
            About
        </Typography>
        <Typography variant="body1" style={{width: '40rem'}} component='p'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores hic aspernatur harum aliquam est dicta earum accusamus sapiente delectus consequatur? Delectus at quasi doloribus vitae! Ab fugiat officia optio itaque dolor aliquam eaque quo cum iure inventore voluptatum totam, aspernatur repellat! Ipsum et sequi quos sapiente, blanditiis obcaecati similique nostrum.
        </Typography>
    </div>
  )
}
export default About