export const getStatisticsByFamily = async (
  setStatisticsByFamily,
  selectedFeelingsFamily
) => {
  console.log("fetching statistics by family");
  try {
    const baseURL = import.meta.env.VITE_baseURL;
    const basePathThree = import.meta.env.VITE_basePathThree;
    const res = await fetch(
      `${baseURL}${basePathThree}stats/family/?family=${selectedFeelingsFamily}`,
      {
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Error fetching statistics by family");
    const data = await res.json();
    setStatisticsByFamily(data.data);
  } catch (error) {
    console.error(error);
  }
};
