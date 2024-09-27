import { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./UserProvider.jsx";
import defaultEmotions from "../../data/emotions.json";
import { handleFamilySelect } from "../helpers/handleFamilySelect.js";
import { handleAddCustomFeeling } from "../helpers/handleAddCustomFeeling.js";

const EmotionsContext = createContext();

const EmotionsProvider = ({ children }) => {
  // ----------------------------------- States---------------------------------
  const [feelingsFamilies, setFeelingsFamilies] = useState();
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [subFeelings, setSubFeelings] = useState([]);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [newFeelingError, setNewFeelingError] = useState({
    message: "",
  });

  // get custom feelings from UserProvider:
  const { customFeelings, setCustomFeelings } = useUserContext();

  const [newFeeling, setNewFeeling] = useState(""); // for new custom feeling

  useEffect(() => {
    // Extract the emotion families from the data
    const families = defaultEmotions.map((family) => ({
      id: family.emotionFamily,
      name: family.emotionFamily,
    }));
    setFeelingsFamilies(families);
  }, []);

  // --------------------- Handle Family Selection ------------------------
  const onFamilySelect = (familyId) => {
    handleFamilySelect(
      defaultEmotions,
      familyId,
      setSelectedFamily,
      setSubFeelings,
      setSelectedFeeling,
      setNewFeelingError
    );
  };

  // --------------------- Handle Feeling Selection ------------------------

  // Store the selected feeling and specify its origin (default or custom)
  const handleFeelingSelect = (feeling, isDefault = true) => {
    setSelectedFeeling({ ...feeling, isDefault });
  };

  // --------------------- Handle Add Custom Feeling ------------------------
  const onAddCustomFeeling = (newFeeling) => {
    handleAddCustomFeeling(
      newFeeling,
      customFeelings,
      defaultEmotions,
      selectedFamily,
      setCustomFeelings,
      handleFeelingSelect,
      setNewFeelingError,
      setNewFeeling
    );
  };

  return (
    <EmotionsContext.Provider
      value={{
        feelingsFamilies,
        selectedFamily,
        setSelectedFamily,
        subFeelings,
        selectedFeeling,
        setSelectedFeeling,
        customFeelings,
        newFeeling,
        setNewFeeling,
        onFamilySelect,
        handleFeelingSelect,
        onAddCustomFeeling,
        newFeelingError,
        setNewFeelingError,
      }}
    >
      {children}
    </EmotionsContext.Provider>
  );
};

export default EmotionsProvider;

export const useEmotionsContext = () => useContext(EmotionsContext);
