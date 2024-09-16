export const handleCheckinSubmit = async ({
  selectedFamily,
  selectedFeeling,
  checkinData,
  setCheckinData,
  comment,
  sleepingHours,
  isActive,
  selectedWeather,
  selectedTags,
}) => {
  setCheckinData({
    emotion: {
      family: selectedFamily,
      name: selectedFeeling,
    },
    tags: selectedTags,
    comment: comment,
    config: {
      sleepingHours: sleepingHours,
      physicalActivity: isActive,
      weather: selectedWeather,
    },
  });

  console.log("Check-in data:", checkinData); // debugging

  try {
    const response = await fetch("http://localhost:3000/user/checkins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkinData),
      credentials: "include", // Send cookies
    });

    if (!response.ok) {
      throw new Error("Failed to submit check-in");
    }

    const data = await response.json();
    console.log("Check-in successful:", data); // debugging
    return data; // Optionally return the response
  } catch (error) {
    console.error("Error during check-in submission:", error);
    throw error;
  }
};
