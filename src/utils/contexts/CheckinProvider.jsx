import { createContext, useContext, useState } from "react";
import { useEmotionsContext } from "./EmotionsProvider";
import { useTagContext } from "../TagProvider.jsx";
import { postCheckin } from "../services/postCheckin.js";
import { getSleepingHours } from "../helpers/getSleepingHours.js";

const CheckinContext = createContext();

export const useCheckinContext = () => useContext(CheckinContext);

export const CheckinProvider = ({ children }) => {
  const [checkinData, setCheckinData] = useState({});

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

  // Access fetch function for fetching today's sleepingHours if available
  const handleGetSleepingHours = () => {
    getSleepingHours(setSleepingHours, setSleepingHoursRecorded);
  };

  // Function for submitting the checkin
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

    try {
      await postCheckin(newCheckinData);
      // After successful submission, show success feedback and reset states
      setCheckinUserFeedback({
        message: "Check-in successfully submitted!",
        type: "info",
      });

      // Reset all states after successful submission
      setCheckinData({});
      setComment("");
      setSleepingHours("");
      setIsActive(false);
      setSelectedWeather("");
      setSelectedFamily(null);
      setSelectedFeeling(null);
      setSelectedTags([]);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error.message);
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
        handleGetSleepingHours,
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
