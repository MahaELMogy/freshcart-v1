import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectRoute(props) {
  let { UserToken } = useContext(UserContext);

  if (UserToken !== null) {
    return props.children;
  } else if (UserToken) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/Login" />;
  }
}
