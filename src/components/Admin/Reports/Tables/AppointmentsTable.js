import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { iconBox } from "../styles";

const AppointmentsTable = () => {
  const appointments = useSelector((state) => state.auth);

  console.log(appointments);

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
          Report on Appointments
        </Typography>
      </div>
      <div class='dashboard-items table-container'>
        <div className='table-row table-head'>
          <div className='table-cell'>
            <p>Agenda</p>
          </div>
          <div className='table-cell'>
            <p>Date</p>
          </div>
          <div className='table-cell'>
            <p>Time</p>
          </div>
          <div className='table-cell'>
            <p>Status</p>
          </div>
        </div>
        {appointments?.user?.appointments?.map((item, index) => (
          <div className='table-row' key={index}>
            <div className='table-cell'>
              <p>{item?.agenda}</p>
            </div>
            <div className='table-cell'>
              <p>{item?.date}</p>
            </div>
            <div className='table-cell'>
              <p>{item?.time}</p>
            </div>
            <div className='table-cell'>
              <p>{item?.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AppointmentsTable;
