import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import Spinners from "../spinners/spinners";

export default function ProtectRoute({ children }) {
  const { UserToken } = useContext(UserContext);
  const navigate = useNavigate();

  if (UserToken === null) {
    return <Spinners />;
  } else if (!UserToken) {
    return navigate("/login");
  } else {
    return children;
  }
}
