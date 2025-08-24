// components/ProtectRoute/ProtectRoute.jsx
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { Navigate } from "react-router-dom";
import Spinners from "../spinners/spinners";

export default function ProtectRoute({ children }) {
  const { UserToken, loading } = useContext(UserContext);

  if (loading) return <Spinners />;

  if (!UserToken) return <Navigate to="/login" replace />;

  return children;
}
