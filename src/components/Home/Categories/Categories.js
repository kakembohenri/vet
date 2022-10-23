import { Link } from "react-router-dom"
import { Typography } from "@mui/material"
import { mainContainer, categories, category, title } from "./styles"

const Categories = () => {
  return (
    <div style={mainContainer}>
        <Typography variant='body1' component='h3' fontWeight='bold'>
            Categories: 
        </Typography>
        <div style={categories}>
            <div style={category} className='category1'>
                <Typography style={title} variant="body1" component='span'>
                   Clinical services
                </Typography>
                <ul className="services services1">
                    <li><Link to='#'>Diagnosis and treatment of diseased animals</Link></li>
                    <li><Link to='#'>Control of production limiting disorders</Link></li>
                </ul>
            </div>
            <div style={category} className='category2'>
            <Typography style={title} variant="body1" component='span'>
                   Preventive services
                </Typography>
                <ul className="services services2">
                    <li><Link to='#'>Tick and tsetse control</Link></li>
                    <li><Link to='#'>Animal testing</Link></li>
                    
                </ul>
            </div>
            <div style={category} className='category3'>
            <Typography style={title} variant="body1" component='span'>
                   Medication
                </Typography>
                <ul className="services services3">
                    <li><Link to='#'>Provision of drugs</Link></li>
                    <li><Link to='#'>Artificial insemination</Link></li>
                     <li><Link to='#'>Management of herd health and production programs</Link></li>
                     <li><Link to='#'>Provision of vaccines</Link></li>
                </ul>
            </div>
            <div style={category} className='category4'>
            <Typography style={title} variant="body1" component='span'>
                   Human Health Protection
                </Typography>
                <ul className="services services4">
                    <li><Link to='#'>Inspection of marketed animal products</Link></li>
                    <li><Link to='#'>Continuous Education and Training</Link></li>
                     <li><Link to='#'>Management of herd health and production programs</Link></li>
                     <li><Link to='#'>Provision of vaccines</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
export default Categories