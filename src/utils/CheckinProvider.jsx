import { createContext, useContext, useState } from "react";
import { useEmotionsContext } from "./EmotionsProvider";
import { useTagContext } from "./TagProvider";

const CheckinContext = createContext();

export const useCheckinContext = () => useContext(CheckinContext);

export const CheckinProvider = ({ children }) => {
  const [checkinData, setCheckinData] = useState({
    emotion: {},
    tags: [],
    comment: "",
    config: {},
  });
  // Final structure of checkinData for POST-request (Example):
  // {
  //   emotion: { family: "Freude", name: "begeistert" },
  //   tags: [
  //     { category: "mitWem", name: "Hund", isDefault: false },
  //     { category: "wann", name: "morgens", isDefault: true },
  //   ],
  //   comment: "blabla",
  //   config: { sleepingHours: 7, physicalActivity: true, weather: "sonnig" },
  // };

  // States for MakeANote.jsx
  const [showNoteInfo, setShowNoteInfo] = useState(false);
  const [comment, setComment] = useState("");

  // States for SleepActivityWeather.jsx + Subcompontens
  const [sleepStart, setSleepStart] = useState(""); // not send to the backend
  const [sleepEnd, setSleepEnd] = useState(""); // not send to the backend
  const [sleepingHours, setSleepingHours] = useState("");
  // sleepStart & sleepEnd? -> SleepRecord.jsx

  const [isActive, setIsActive] = useState(false);
  // switchId? -> ActivitySwitch.jsx

  const [selectedWeather, setSelectedWeather] = useState("");

  // States from other Providers
  const { selectedFamily, selectedFeeling } = useEmotionsContext();
  const { selectedTags } = useTagContext();

  // useful states for future featurs like loading spinner or error handling when submitting the checkin
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckinSubmit = async () => {
    setIsLoading(true);
    setError(null);

    const newCheckinData = {
      emotion: {
        family: selectedFamily,
        name: selectedFeeling.name,
      },
      tags: selectedTags.map((tag) => ({
        name: tag.name,
        category: tag.category,
        isDefault: tag.isDefault,
      })),
      comment: comment,
      config: {
        sleepingHours: sleepingHours,
        physicalActivity: isActive,
        weather: selectedWeather,
      },
    };

    setCheckinData(newCheckinData);

    console.log("newCheckinData:", newCheckinData); // debugging

    try {
      const response = await fetch("http://localhost:3000/user/checkins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCheckinData),
        credentials: "include", // Send cookies
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to get detailed error message from backend;
        console.error("Error details from backend:", errorData); //
        throw new Error(errorData.message || "Failed to submit check-in");
      }

      const data = await response.json();
      console.log("Check-in successful:", data); // debugging
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error during check-in submission:", error);
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <CheckinContext.Provider
      value={{
        checkinData,
        setCheckinData,
        showNoteInfo,
        setShowNoteInfo,
        comment,
        setComment,
        sleepStart,
        setSleepStart,
        sleepEnd,
        setSleepEnd,
        sleepingHours,
        setSleepingHours,
        isActive,
        setIsActive,
        selectedWeather,
        setSelectedWeather,
        selectedFamily,
        selectedFeeling,
        selectedTags,
        handleCheckinSubmit,
        isLoading,
        error,
      }}
    >
      {children}
    </CheckinContext.Provider>
  );
};

export default CheckinProvider;
