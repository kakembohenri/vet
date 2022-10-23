import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import "./Alert.css";

const AlertBox = () => {
  const alert = useSelector((state) => state.alert);

  return (
    <>
      {alert !== null &&
        (alert?.alertType === "error" ? (
          <div className='notification'>
            <Alert severity='error'>{alert?.msg}</Alert>
          </div>
        ) : (
          alert?.alertType === "success" && (
            <div className='notification'>
              <Alert severity='success'>{alert?.msg}</Alert>
            </div>
          )
        ))}
    </>
  );
};
export default AlertBox;
