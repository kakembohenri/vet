import { useEffect, useState } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { Paper, Typography, Button, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { suspenduser } from "../../../actions/profile";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Investigate = () => {
  const { userReports } = useSelector((state) => state.profile);
  // console.log(userReports[0].reports[0].reported)
const dispatch = useDispatch();
const navigate = useNavigate()
const [reportsArr, setReportsArr] = useState(null);


useEffect(() => {
  let newArr = userReports?.map((item) => JSON.stringify(item));

  let final = newArr
    ?.filter((item, index) => newArr?.indexOf(item) === index)
    ?.map((item) => JSON.parse(item));

  setReportsArr(final);
}, [userReports]);

// console.log(userReports)
console.log(reportsArr)
  return (
    <div>
      <NavbarAdmin />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          sx={{
            margin: "2rem 0rem",
            padding: "0.3rem",
            borderBottom: "0.3rem solid green",
            width: "fit-content",
          }}
          variant='h4'
          component='h1'>
          Investigate user:{" "}
        </Typography>
          <b style={{ fontSize: '2rem', marginLeft: '1rem' }}>
            {userReports[0]?.name?.map((item, index) => (
              <span key={index}>{item} </span>
            ))}
          </b>
      </div>
      <div style={{ marginLeft: "15rem", marginRight: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant='contained' onClick={() => dispatch(suspenduser(userReports[0]?.reports?.reported, navigate))}>Suspend</Button>
        </div>
        {userReports?.map((item, index) => (
          <Paper
            key={index}
            sx={{ margin: "3rem 0rem", padding: "1rem", width: '60%' }}
            elevation={5}>
              <Avatar src={item?.farmer_pic} />
              <Typography>
                {item?.name?.map((item, index) => (
                  <span key={index}>{item} </span>
                ))}
              </Typography>
            <div>{item?.reports?.body}</div>
            <p style={{ textAlign: "right" }}>
              {moment(item?.reports?.createdAt).fromNow()}
            </p>
          </Paper>
        ))}
      </div>
    </div>
  );
};
export default Investigate;
