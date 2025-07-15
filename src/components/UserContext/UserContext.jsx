import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export let UserContext = createContext(0);

export default function UserContextProvider(props) {
  let [UserToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      setUserToken(token);
    }
  }, []);

  if (!UserToken) {
    <Navigate to="/login" />;
  } else {
    <Navigate to="/" />;
  }
  return (
    <>
      <UserContext.Provider value={{ UserToken, setUserToken }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
}
