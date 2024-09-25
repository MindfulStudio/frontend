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

  // State to store the feedback message and its type (success or error)
  const [checkinUserFeedback, setCheckinUserFeedback] = useState({
    message: "",
    type: "",
  });

  // useful states for future featurs like loading spinner or error handling when submitting the checkin
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // States for MakeANote.jsx
  const [showNoteInfo, setShowNoteInfo] = useState(false);
  const [comment, setComment] = useState("");

  // States for SleepActivityWeather.jsx + Subcomponents
  const [sleepingHours, setSleepingHours] = useState(null);
  const [sleepingHoursRecorded, setSleepingHoursRecorded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // switchId? -> ActivitySwitch.jsx
  const [selectedWeather, setSelectedWeather] = useState("");

  // State for badge info popup ("wichtig"/"optional" badges)
  const [showBadgeInfo, setShowBadgeInfo] = useState(null);

  // States from other Providers
  const {
    selectedFamily,
    selectedFeeling,
    setSelectedFamily,
    setSelectedFeeling,
  } = useEmotionsContext();

  const { selectedTags, setSelectedTags } = useTagContext();

  const getCheckinsFromToday = async () => {
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

  // Fetch function for fetching today's sleepingHours if available
  const fetchSleepingHours = async () => {
    try {
      const checkins = await getCheckinsFromToday();
      if (checkins && checkins.data[0]) {
        // set SleepingHours to value of today's first checkin
        const hours = checkins.data[0].config.sleepingHours;
        setSleepingHours(hours);
        setSleepingHoursRecorded(true);
      }
    } catch (error) {
      console.error("Error fetching sleeping hours:", error);
    }
  };

  // Fetch function for submitting the checkin
  const handleCheckinSubmit = async () => {
    setIsLoading(true);
    setError(null);

    const newCheckinData = {
      emotion: {
        family: selectedFamily,
        name: selectedFeeling.name,
        isDefault: selectedFeeling.isDefault,
      },
      tags: selectedTags.map((tag) => ({
        name: tag.name,
        category: tag.category,
        isDefault: tag.isDefault,
      })),
      comment: comment,
      config: {
        sleepingHours: sleepingHours || null,
        physicalActivity: isActive || false,
        weather: selectedWeather || null,
      },
    };

    setCheckinData(newCheckinData);

    console.log("newCheckinData:", newCheckinData); // debugging

    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const basePathThree = import.meta.env.VITE_basePathThree;
      const response = await fetch(`${baseURL}${basePathThree}checkins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCheckinData),
        credentials: "include", // Send cookies
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to get detailed error message from backend;
        console.error("Error details from backend:", errorData);
        throw new Error(errorData.message || "Failed to submit check-in");
      }

      const data = await response.json();
      // After successful submission, show success feedback and reset states
      setCheckinUserFeedback({
        message: "Check-in successfully submitted!",
        type: "info",
      });
      console.log("Check-in successful:", data); // debugging

      // Reset all states after successful submission
      setCheckinData({
        emotion: {},
        tags: [],
        comment: "",
        config: {},
      });
      setComment("");
      setSleepingHours("");
      setIsActive(false);
      setSelectedWeather("");
      setSelectedFamily(null);
      setSelectedFeeling(null);
      setSelectedTags([]);

      setIsLoading(false);

      console.log("checkindata cleared:", checkinData); // debugging

      return data;
    } catch (error) {
      console.error("Error during check-in submission:", error);
      setError(error.message);
      setCheckinUserFeedback({ message: error.message, type: "error" });
      setIsLoading(false);
      throw error;
    }
  };

  // Handler for showing badge info
  const handleBadgeClick = (category) => {
    setShowBadgeInfo(category);
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
        sleepingHours,
        setSleepingHours,
        sleepingHoursRecorded,
        fetchSleepingHours,
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
        showBadgeInfo,
        setShowBadgeInfo,
        handleBadgeClick,
        checkinUserFeedback,
        setCheckinUserFeedback,
      }}
    >
      {children}
    </CheckinContext.Provider>
  );
};

export default CheckinProvider;
