import { Link } from "react-router-dom";
import { Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { iconBox } from "../styles";

const FarmersTable = () => {
  const farmers = useSelector((state) => state.auth);

  return (
    <div>
      <div style={iconBox}>
        <Link style={{ textDecoration: "none" }} to='/admin/dashboard'>
          <Typography color='black' fontWeight={700} variant='h4' component='p'>
            <small style={{ color: "lightgreen" }}>i</small>V
            <span style={{ color: "lightgreen" }}>e</span>t
          </Typography>
        </Link>
        <Typography color='black' fontWeight={700} variant='h4' component='p'>
          Report on Farmers
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
            <p>Farm name</p>
          </div>
          <div className='table-cell'>
            <p>Bio</p>
          </div>
        </div>
        {farmers?.user?.farmers?.map((item, index) => (
          <div className='table-row' key={index}>
            <div className='table-cell'>
              <Avatar src={item?.profile_pic} />
            </div>
            <div className='table-cell'>
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
              <p>{item?.farm_name}</p>
            </div>
            <div className='table-cell'>{item?.bio}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FarmersTable;
