export const deactivateCustom = async (name, type) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const pathURL = import.meta.env.VITE_basePathThree;
  try {
    const res = await fetch(`${baseURL}${pathURL}customs`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type }),
      credentials: "include",
    });

    // In case of error:
    if (!res.ok) {
      throw new Error(
        "Ein unerwarteter Fehler ist aufgetreten. Deaktivierung nicht möglich."
      );
    }
    return;
  } catch (error) {
    // In case of any other server errors:
    console.log(error || "Ein unerwarteter Serverfehler ist aufgetreten.");
  }
};
