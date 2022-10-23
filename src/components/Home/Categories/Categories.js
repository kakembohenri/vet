import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { mainContainer, categories, category, title } from "./styles";

const Categories = () => {
  return (
    <div style={mainContainer}>
      <Typography variant='body1' component='h3' fontWeight='bold'>
        Categories:
      </Typography>
      <div style={categories}>
        <div style={category} className='category1'>
          <Typography style={title} variant='body1' component='span'>
            Clinical services
          </Typography>
          <ul className='services services1'>
            <li>
              <Link to='/category/Clinical Services/Clinical diagnosis'>
                Clinical diagnosis
              </Link>
            </li>
            <li>
              <Link to='/category/Clinical Services/Ophthalmic surgeries'>
                Ophthalmic surgeries
              </Link>
            </li>
            <li>
              <Link to='/category/Clinical Services/Dental surgeries'>
                Dental surgeries
              </Link>
            </li>
          </ul>
        </div>
        <div style={category} className='category2'>
          <Typography style={title} variant='body1' component='span'>
            Preventive services
          </Typography>
          <ul className='services services2'>
            <li>
              <Link to='/category/Preventive Services/Preventive healthcare'>
                Preventive healthcare
              </Link>
            </li>
            <li>
              <Link to='/category/Preventive Services/Castration'>
                Castration
              </Link>
            </li>
            <li>
              <Link to='/category/Preventive Services/Artificial insemination'>
                Artificial insemination
              </Link>
            </li>
            <li>
              <Link to='/category/Preventive Services/Health status examination'>
                Health status examination
              </Link>
            </li>
            <li>
              <Link to='/category/Preventive Services/Vaccination'>
                Vaccination
              </Link>
            </li>
            <li>
              <Link to='/category/Preventive Services/Spraying'>Spraying</Link>
            </li>
          </ul>
        </div>
        <div style={category} className='category3'>
          <Typography style={title} variant='body1' component='span'>
            Medication
          </Typography>
          <ul className='services services3'>
            <li>
              <Link to='/category/Medication/Administer prescribed drugs'>
                Administer prescribed drugs
              </Link>
            </li>
            <li>
              <Link to='/category/Medication/Diagnose Illnesses'>
                Diagnose Illnesses
              </Link>
            </li>
            <li>
              <Link to='/category/Medication/Wound dressing'>
                Wound dressing
              </Link>
            </li>
            <li>
              <Link to='/category/Medication/Prescribe medication'>
                Prescribe medication
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Categories;
