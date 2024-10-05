export const getUserData = async (setError, setUserData) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const pathURL = import.meta.env.VITE_basePathTwo;

  try {
    const response = await fetch(`${baseURL}${pathURL}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    // In case of userNotFound error:
    if (!response.ok) {
      setError({
        message:
          "Ein unerwarteter Fehler ist aufgetreten. Bitte logge dich neu ein.",
      });
      return;
    } else {
      // Set userData to values from database (except "isConfigured")
      setUserData({
        ...data.data,
        config: { ...data.data.config, isConfigured: true },
      });
    }
    return;
  } catch {
    // In case of any other server errors:
    setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
  }
};
