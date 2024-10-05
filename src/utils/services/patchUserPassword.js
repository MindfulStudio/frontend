export const patchUserPassword = async (passwords, setError, setInfo) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const pathURL = import.meta.env.VITE_basePathTwo;

  try {
    const response = await fetch(`${baseURL}${pathURL}password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passwords }),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    // In case of userNotFound error:
    if (!response.ok) {
      if (data.error === "wrongPassword") {
        setError({
          message: "Das aktuelle Passwort wurde nicht korrekt eingegeben.",
        });
      } else {
        setError({
          message:
            "Ein unerwarteter Fehler ist aufgetreten. Bitte logge dich neu ein.",
        });
      }
      return;
    } else {
      setInfo({ message: "Passwort erfolgreich aktualisiert." });
    }
    return data;
  } catch {
    // In case of any other server errors:
    setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
  }
};
