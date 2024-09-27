import { createContext, useContext, useEffect, useState } from "react";
import { verifyCookie } from "../services/verifyCookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(false);

  // Check if the cookie remains valid after closing and reopening the browser
  useEffect(() => {
    // isLoggedOut --> to prevent that useEffect will be triggered after logout
    if (!isLoggedIn && !isLoggedOut) verifyCookie(setIsLoggedIn);
  }, [isLoggedIn]);

  // Check for cookie consent on initial load
  useEffect(() => {
    const allCookies = document.cookie.split("; ");
    const consent = allCookies.some((cookie) =>
      cookie.startsWith("cookieConsent=true")
    );
    setCookieConsent(consent);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoggedOut,
        setIsLoggedOut,
        cookieConsent,
        setCookieConsent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
