export const resetPassword = async (
  token,
  password,
  setError,
  setSuccess
) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const pathURL = import.meta.env.VITE_basePathOne;

  try {
    const response = await fetch(`${baseURL}${pathURL}resetPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
      credentials: "include",
    });
    const data = await response.json();
    // In case of userNotFound error:
    if (!response.ok) {
      console.log(data);
      setError({
        message:
          "Das hat leider nicht geklappt. Dein Passwort wurde nicht geändert oder zurückgesetzt.",
      });
      return;
    } else {
      setSuccess(true);
    }
    return data;
  } catch {
    // In case of any other server errors:
    setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
  }
};
