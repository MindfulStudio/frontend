export const getAllCheckins = async (setCheckIn) => {
  try {
    const baseURL = import.meta.env.VITE_baseURL;
    const basePathThree = import.meta.env.VITE_basePathThree;

    const res = await fetch(`${baseURL}${basePathThree}checkins`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Error fetching check-ins");
    const data = await res.json();
    setCheckIn(data.data.length);
  } catch (error) {
    console.error(error);
  }
};
