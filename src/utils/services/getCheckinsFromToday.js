export const getCheckinsFromToday = async () => {
  const baseURL = import.meta.env.VITE_baseURL;
  const path = import.meta.env.VITE_basePathThree;
  try {
    const res = await fetch(`${baseURL}${path}checkins/today`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
