export const postCheckin = async (newCheckinData) => {
  const baseURL = import.meta.env.VITE_baseURL;
  const basePathThree = import.meta.env.VITE_basePathThree;
  const response = await fetch(`${baseURL}${basePathThree}checkins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCheckinData),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error details from backend:", errorData);
    throw new Error(errorData.message || "Failed to submit check-in");
  }

  const data = await response.json();
  console.log(data);
  return data;
};
