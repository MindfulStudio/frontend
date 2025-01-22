export const forgotPassword = async (email, setError, setInfo) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const pathURL = import.meta.env.VITE_basePathOne;

  try {
    const response = await fetch(`${baseURL}${pathURL}forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    if (response.ok) {
      setInfo({
        message:
          "Wir haben dir per Email einen Link zum Zurücksetzen deines Passworts gesendet. Bitte überprüfe dein Email-Postfach um fortzufahren.",
      });
      return;
    }
    return data;
  } catch {
    // In case of any errors:
    setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
  }
};
