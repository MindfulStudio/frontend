import { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./UserProvider";
import defaultEmotions from "../data/emotions.json";

const EmotionsContext = createContext();

const EmotionsProvider = ({ children }) => {
  // ----------------------------------- States---------------------------------
  const [feelingsFamilies, setFeelingsFamilies] = useState();
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [subFeelings, setSubFeelings] = useState([]);
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  // get custom feelings from UserProvider:
  const { customFeelings, setCustomFeelings } = useUserContext();

  // NOTICE: This is an array of objects with id and name properties to store the new custom feelings; In the Frontend it is useful in this format, but for the check-in schema, we need to pull out the referring values and send them in the body with the correct keys to the backend
  const [newFeeling, setNewFeeling] = useState("");
  // this is for the new custom feeling, which we retrieve from the input field

  useEffect(() => {
    // Extract the emotion families from the data, to use them for the FeelingsFamilyButton component:
    const families = defaultEmotions.map((family) => ({
      id: family.emotionFamily,
      name: family.emotionFamily,
    }));
    setFeelingsFamilies(families);
    // Set the extracted emotion families in the state variable feelingsFamilies to use them in the FeelingsFamilyButton component
    // NOTICE: FeelingsFamilyButton will be renamed soon!
  }, []);

  // --------------------- Handle family selection -----------------------------

  // Function to handle the selection of a family and their sub-feelings

  const handleFamilySelect = (familyId) => {
    // we need a familyId to identify the selected family and fetch the corresponding sub-feelings; familyId is the id of the selected family (this id comes from the data in emotions.json)
    setSelectedFamily(familyId); // store the selected family in a state

    // Find the corresponding emotions family object in the data array, based on the selected family id:
    const selectedFamilyData = defaultEmotions.find(
      (family) => family.emotionFamily === familyId
      // check every object in the family array, if the emotionFamily property of the object is equal to the selected family id; if yes, return the object
    );

    if (!selectedFamilyData) {
      console.error(`No family found for the selected id: ${familyId}`);
      return; // early exit if no matching family is found
    }

    // Extract the sub-feelings from the selected family data and create an array of objects with id and name properties:

    // format of the subfeelings in the selectedFamilyData: ["aufgeschreckt", "ängstlich", "angespannt"]

    if (selectedFamilyData) {
      const subFeelingsObject = selectedFamilyData.singleEmotions.map(
        (subfeeling, index) => ({
          id: index,
          name: subfeeling,
        })
      );
      // expected result:
      /* [
                 { id: 0, name: "aufgeschreckt" },
                 { id: 1, name: "ängstlich" },
                 { id: 2, name: "angespannt" }
                ]
            */
      // this is more useful for lists, because we can use the id as key in the list

      // store the sub-feelings of the selected family in the state variable subFeelings
      setSubFeelings(subFeelingsObject);
    } else {
      setSubFeelings([]); // Reset sub-feelings when no family is selected
    }
    setSelectedFeeling(null); // reset the selected feeling when a new family is selected; this is not the same as !selectedFamilyData
  }; // end of the function handleFamilySelect

  // --------------------- Handle subfeeling Selection ------------------------

  // When the user selects a feeling, store the selected feeling in the state variable selectedFeeling

  /*  const handleFeelingSelect = (subfeeling) => {
    setSelectedFeeling(subfeeling);
    console.log("Selected Feeling:", subfeeling);
  }; */ // This only worked for the standard subfeelings

  // Extending the handleFeelingSelect function so that it can recognize from which list the feeling was selected (standard oder custom): Pass an additional parameter that specifies the origin of the feeling: isDefault = true (default value)

  const handleFeelingSelect = (feeling, isDefault = true) => {
    setSelectedFeeling({ ...feeling, isDefault });
    console.log("Selected Feeling:", feeling);
  };

  // --------------------- Handle Add Custom Feelings ------------------------

  const handleAddCustomFeeling = (newFeeling) => {
    // CHECKS FOR VALID INPUT:

    if (newFeeling.trim() === "") {
      return; // early exit if the input is empty
    }

    // remove whitespaces:
    newFeeling = newFeeling.trim();

    // only allow letters
    const regex = /^[a-zA-ZäöüÄÖÜß]+$/;
    if (!regex.test(newFeeling)) {
      // TODO: Implement User Feedback in the UI
      console.log("Invalid input:", newFeeling);
      return;
    }

    // allowed length of the feeling
    if (newFeeling.length < 3 || newFeeling.length > 18) {
      // TODO: Implement User Feedback in the UI
      console.log("Invalid length:", newFeeling);
      return;
    }

    // Check for duplicates within the customfeelings for the selected family
    // TODO: Refactor Logic for checking if the new feeling is already in the database and prevent duplicates, also check for not allowed characters etc.
    const isDuplicate = (customFeelings[selectedFamily] || []).some(
      (feeling) => feeling.name.toLowerCase() === newFeeling.toLowerCase()
    );
    if (isDuplicate) {
      console.log("Feeling already exists:", newFeeling);
      // TODO: Implement User Feedback in the UI
      return; // early exit if the feeling already exists
    }

    // CREATE A NEW OBJECT FOR THE NEW CUSTOM FEELING:

    // As we have objects for the standard subfeelings to list them in the SubfeelingsContainer, it might be useful to create an object for the custom feeling as well:

    const customFeelingsObject = {
      id: Date.now(), //TODO: Assigning an unique and useful id; For the Standard-Subfeelings, it is the index of the array, because this array won´t change. But for the custom feelings, we might need a different approach? I suggest Date.now() for now, but we should discuss this to find a better solution.
      name: newFeeling,
      isDefault: false, // this is a custom feeling, so it is not a default feeling
    };

    const updatedCustomFeelings = {
      ...customFeelings,
      [selectedFamily]: [
        ...(customFeelings[selectedFamily] || []),
        customFeelingsObject,
      ],
    };

    setCustomFeelings(updatedCustomFeelings); // add the new feeling to the existing array of custom feelings;

    console.log("New custom feeling added:", newFeeling);

    setNewFeeling(""); // this clears the input field;
    // if we do not clear the input field, the user might think, that the feeling was not added, because the input field is still filled etc.
  };

  return (
    <EmotionsContext.Provider
      value={{
        feelingsFamilies,
        selectedFamily,
        subFeelings,
        selectedFeeling,
        customFeelings,
        newFeeling,
        setNewFeeling,
        handleFamilySelect,
        handleFeelingSelect,
        handleAddCustomFeeling,
      }}
    >
      {children}
    </EmotionsContext.Provider>
  );
};

export default EmotionsProvider;

export const useEmotionsContext = () => useContext(EmotionsContext);
3333