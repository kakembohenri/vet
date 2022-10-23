import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { confirmemail } from "../../../../../actions/auth";

const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, code, id } = useParams();
  dispatch(confirmemail(email, code, id, navigate));

  return <div>Verifying your email address...</div>;
};
export default ConfirmEmail;
