import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;
const pathURL = import.meta.env.VITE_basePathOne;

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const res = await fetch(`${baseURL}${pathURL}verifyCookie`, {
          credentials: "include",
        });
        setIsLoggedIn(res.ok ? true : false);
      } catch (error) {
        setIsLoggedIn(false);
        console.error(error);
      }
    };
    verifyCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
