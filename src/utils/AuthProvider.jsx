import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;
const pathURL = import.meta.env.VITE_basePathOne;

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const verifyCookie = async () => {
    try {
      const res = await fetch(`${baseURL}${pathURL}verifyCookie`, {
        credentials: "include",
      });
      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      const data = await res.json();
      setIsLoggedIn(data.isValid || false);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  // Check if the cookie remains valid after closing and reopening the browser
  useEffect(() => {
    // isLoggedOut --> to prevent that useEffect will be triggered after logout
    if (!isLoggedIn && !isLoggedOut) verifyCookie();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoggedOut, setIsLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
