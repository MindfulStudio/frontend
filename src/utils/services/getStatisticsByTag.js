export const getStatisticsByTag = async (tagName, setStatisticsByTag) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const path = import.meta.env.VITE_basePathThree;
  try {
    const res = await fetch(`${baseURL}${path}stats/tag?tag=${tagName}`, {
      credentials: "include",
    });
    const data = await res.json();
    if (data && data.data) {
      setStatisticsByTag(data.data);
    }
  } catch (error) {
    console.error(error);
  }
};
