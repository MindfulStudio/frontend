export const patchUserData = async (userData, setError, setInfo) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const pathURL = import.meta.env.VITE_basePathTwo;

  try {
    const response = await fetch(`${baseURL}${pathURL}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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
      setInfo({ message: "Daten erfolgreich aktualisiert." });
    }
    return data;
  } catch {
    // In case of any other server errors:
    setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
  }
};
