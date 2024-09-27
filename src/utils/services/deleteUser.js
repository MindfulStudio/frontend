export const deleteUser = async (setError) => {
  try {
    const baseURL = import.meta.env.VITE_baseURL;
    const pathURL = import.meta.env.VITE_basePathTwo;
    const response = await fetch(`${baseURL}${pathURL}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      setError({
        message:
          "Ein unerwarteter Fehler ist aufgetreten. Bitte logge Dich neu ein.",
      });
      return { error };
    }

    return data;
  } catch (error) {
    console.error("Error details from backend:", error); // debugging
    setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
    return { error };
  }
};
