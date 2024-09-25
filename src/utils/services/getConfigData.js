export const getConfigData = async (setConfig) => {
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
      throw new Error(
        "Ein unerwarteter Fehler ist aufgetreten. Bitte neu einloggen."
      );
    }
    setConfig(data.data.config);
    return data.data.config;
  } catch (error) {
    // In case of any other server errors:
    console.log(error || "Ein unerwarteter Serverfehler ist aufgetreten.");
    return error;
  }
};
