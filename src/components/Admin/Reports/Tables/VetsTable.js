import { Link } from "react-router-dom";
import { Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { iconBox } from "../styles";

const VetsTable = () => {
  const vets = useSelector((state) => state.auth);

  return (
    <div>
      {/* <div>
        <Button variant='contained' onClick={() => print(ids)}>
          Print report
        </Button>
      </div> */}

      <div style={iconBox}>
        <Link style={{ textDecoration: "none" }} to='/admin/dashboard'>
          <Typography color='black' fontWeight={700} variant='h4' component='p'>
            <small style={{ color: "lightgreen" }}>i</small>V
            <span style={{ color: "lightgreen" }}>e</span>t
          </Typography>
        </Link>
        <Typography color='black' fontWeight={700} variant='h4' component='p'>
          Report on vets
        </Typography>
      </div>
      <div class='dashboard-items table-container'>
        <div className='table-row table-head'>
          <div className='table-cell'>
            <p>Avatar</p>
          </div>
          <div className='table-cell'>
            <p>Name</p>
          </div>
          <div className='table-cell'>
            <p>Location</p>
          </div>
          <div className='table-cell'>
            <p>Rating</p>
          </div>
          <div className='table-cell'>
            <p>Verified</p>
          </div>
          <div className='table-cell'>
            <p>Services</p>
          </div>
          <div className='table-cell'>
            <p>Experinces</p>
          </div>
          <div className='table-cell'>
            <p>Phone number</p>
          </div>
        </div>
        {vets?.vets?.result?.map((item, index) => (
          <div className='table-row' key={index}>
            <div className='table-cell'>
              <Avatar src={item?.profile_pic} />
            </div>
            <div class='table-cell'>
              <span>
                {item?.name?.map((item, index) => (
                  <span key={index}>{item} </span>
                ))}
              </span>
            </div>
            <div className='table-cell'>
              <p>{item?.location.name}</p>
            </div>
            <div className='table-cell'>
              <p>{item?.rating}</p>
            </div>
            <div className='table-cell'>
              {item?.isVerified ? <p>Yes</p> : <p>No</p>}
            </div>
            <div className='table-cell'>
              {item?.services?.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
            <div className='table-cell'>
              <p>{item?.experience}</p>
            </div>
            <div className='table-cell'>
              <p>{item?.contacts?.phone_number}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VetsTable;
