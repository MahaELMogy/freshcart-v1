// components/UserContext/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [UserToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) setUserToken(token);
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ UserToken, setUserToken, loading }}>
      {children}
    </UserContext.Provider>
  );
}
