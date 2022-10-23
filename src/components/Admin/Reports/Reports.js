import { useEffect, useState } from "react";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import { Typography, Button, Paper, Avatar, Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userreports } from "../../../actions/profile";
import { header, headerContainer } from "./styles";

const Reports = () => {
  const { reports } = useSelector((state) => state.profile);
  const profile = useSelector(state => state.profile)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reportsArr, setReportsArr] = useState(null);


  useEffect(() => {
    let newArr = reports?.map((item) => JSON.stringify(item));

    let final = newArr
      ?.filter((item, index) => newArr?.indexOf(item) === index)
      ?.map((item) => JSON.parse(item));

    setReportsArr(final);
  }, [reports]);

  return (
    <div>
      <NavbarAdmin />
      <div style={{ marginLeft: "15rem", marginRight: "3rem" }}>
        <div style={headerContainer}>
          <Typography style={header} variant='h4' component='h1'>
            Reported Accounts: <b>{reportsArr?.length}</b>
          </Typography>
        </div>
        {!reportsArr?.length > 0 || reportsArr === null ? (
          <Typography>There are no reported users</Typography>
        ) : (
          reportsArr?.map((item, index) => (
            <Paper
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "1rem",
              }}
              elevation={5}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar src={item?.vet?.profile_pic} />
                <Typography>{item?.vet?.name}</Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    value={Number(item?.vet?.rating)}
                    precision={0.25}
                    readOnly
                  />
                  <span>{item?.vet?.rating}</span>
                </div>
              </div>
              <div>
                <Typography
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: "bolder",
                  }}
                  variant='body1'
                  component='span'>
                  Report cases:
                  <span style={{ fontSize: "2rem" }}>{item?.reports}</span>
                </Typography>
                {item?.isBanned ? (
                  <Typography>User account is banned</Typography>
                ):(
                <Button
                  variant='contained'
                  onClick={() =>
                    dispatch(userreports(item?.vet?.vet, navigate))
                  }>
                  Investigate
                </Button>

                )}
              </div>
            </Paper>
          ))
        )}
      </div>
    </div>
  );
};
export default Reports;
