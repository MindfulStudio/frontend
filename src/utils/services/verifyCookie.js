const baseURL = import.meta.env.VITE_baseURL;
const pathURL = import.meta.env.VITE_basePathOne;

export const verifyCookie = async (setIsLoggedIn) => {
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
