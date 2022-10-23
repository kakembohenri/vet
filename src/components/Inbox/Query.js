import { Paper, Avatar, Typography, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { retrievechats } from "../../actions/profile";

const Query = ({ names, auth, setSearch }) => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(null);

  const onClick = (name) => {
    setSearch("");
    if (name?.vet) {
      console.log(name.vet)

      dispatch(retrievechats(current, name.vet));
    } else {
      dispatch(retrievechats(current, name.farmer));
    }
  };

  useEffect(() => {
    if (auth.user._doc?.vet) {
      setCurrent(auth.user._doc.vet);
    } else {
      setCurrent(auth.user._doc.farmer);
    }
  }, [auth.user._doc.vet, auth.user._doc.farmer]);

  return (
    <Paper
      elevation={5}
      sx={{
        position: "absolute",
        top: "100%",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        padding: "0.8rem",
        width: "90%",
      }}>
      {names?.searchChat && !names?.searchChat.length > 0 ? (
        <Typography>No results</Typography>
      ) : (
        names?.searchChat
          ?.filter((item) => item._id !== auth.user._doc._id)
          .map((item, index) => (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => onClick(item)}>
              <div
                style={{
                  display: "flex",
                  margin: "0.3rem 0rem",
                }}>
                <Avatar src={item?.profile_pic} />
                <Typography sx={{ marginLeft: "0.3rem" }}>
                  {item.name}
                </Typography>
              </div>
              <Divider />
            </div>
          ))
      )}
    </Paper>
  );
};
export default Query;
