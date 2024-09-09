import { createContext, useContext, useState, useEffect } from "react";

const EmotionsContext = createContext();

const EmotionsProvider = ({ children }) => {
  // ----------------------------------- States---------------------------------
  const [feelingsFamilies, setFeelingsFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [subFeelings, setSubFeelings] = useState([]);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [customFeelings, setCustomFeelings] = useState([]);
  // NOTICE: This is an array of objects with id and name properties to store the new custom feelings; We must check, if this is the best way to store the custom feelings and create a two-way-connection between the frontend and the backend
  const [newFeeling, setNewFeeling] = useState("");
  // this is for the new custom feeling itself, which we retrieve from the input field

  // ---------------------Fetching Frontend Data------------------------

  // Function to fetch frontend emotions data from emotions.json, when loading the Page the first time
  const fetchFeelings = async () => {
    try {
      const response = await fetch("/src/data/emotions.json");

      if (!response.ok) {
        throw new Error(`Error fetching emotions data`);
      }
      const data = await response.json(); // Parse JSON data and store it in data, which is an array of objects; every object represents an emotion family
      // Extract the emotion families from the data, to use them for the FeelingsFamilyButton component:
      const families = data.map((family) => ({
        id: family.emotionFamily,
        name: family.emotionFamily,
      })); // this step creates an Array with several emotionfamily-objects. Every emotionfamily object gets an id and name property with the same value: the emotion family name; this is done to make the data structure compatible with the FeelingsFamilyButton component

      setFeelingsFamilies(families); // Set the extracted emotion families in the state variable feelingsFamilies to use them in the FeelingsFamilyButton component
      // NOTICE: FeelingsFamilyButton will be renamed soon!
    } catch (error) {
      console.error("Error fetching emotions data:", error);
    }
  };

  // call the fetchFeelings function when the component is mounted:
  useEffect(() => {
    fetchFeelings();
  }, []);

  // --------------------- Handle family selection -----------------------------

  // Function to handle the selection of a family and their sub-feelings

  const handleFamilySelect = (familyId) => {
    // we need a familyId to identify the selected family and fetch the corresponding sub-feelings; familyId is the id of the selected family (this id comes from the data in emotions.json)
    setSelectedFamily(familyId); // store the selected family in a state

    // Right after the user has selected a family, fetch the sub-feelings for the selected family:

    // NOTICE: This is a second fetch request by purpose, which is triggered by the user´s action; the first fetch request is triggered by the useEffect-Hook, which fetches the data when the component is mounted; We could refactor this later, to avoid fetching the same data twice

    fetch("/src/data/emotions.json")
      .then((response) => response.json())
      .then((data) => {
        // find the corresponding emotions family object in the data array, based on the selected family id:
        const selectedFamilyData = data.find(
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
      })
      .catch((error) => {
        console.error("Error fetching sub-feelings:", error);
      });
  }; // end of the function handleFamilySelect

  // ------------------------------------------------------------------------

  // TODO: Implement extra logic for fetching all the custom-subfeelings

  // NOTICE: This fetch should be added to the useEffect-Hook, which is already here (above after fetchFeelings), to fetch the data when the component is mounted

  // --------------------- Handle subfeeling Selection ------------------------

  // When the user selects a feeling, store the selected feeling in the state variable selectedFeeling

  /*  const handleFeelingSelect = (subfeeling) => {
    setSelectedFeeling(subfeeling);
    console.log("Selected Feeling:", subfeeling);
  }; */ // This only worked for the standard subfeelings

  // Extending the handleFeelingSelect function so that it can recognize from which list the feeling was selected (standard oder custom). One possibility is to pass an additional parameter that specifies the origin of the feeling: fromCustomFeelings = false (default value)
  const handleFeelingSelect = (feeling, fromCustomFeelings = false) => {
    setSelectedFeeling({ ...feeling, fromCustomFeelings });
    console.log("Selected Feeling:", feeling);
  };

  // --------------------- Handle Add Custom Feelings ------------------------

  const handleAddCustomFeeling = (newFeeling) => {
    if (newFeeling.trim() === "") {
      return; // early exit if the input is empty
    }

    // TODO: Logic for checking if the new feeling is already in the database and prevent duplicates, also check for not allowed characters etc.

    // As we have objects for the standard subfeelings to list them in the SubfeelingsContainer, it might be useful to create an object for the custom feeling as well:
    const customFeelingsObject = {
      id: Date.now(), //TODO: Assigning an unique and useful id; For the Standard-Subfeelings, it is the index of the array, because this array won´t change. But for the custom feelings, we might need a different approach? I suggest Date.now() for now, but we should discuss this to find a better solution.
      name: newFeeling,
    };

    setCustomFeelings([...customFeelings, customFeelingsObject]); // add the new feeling to the existing array of custom feelings;
    console.log("New custom feeling added:", newFeeling);

    setNewFeeling(""); // this clears the input field;

    // if we do not clear the input field, the user might think, that the feeling was not added, because the input field is still filled etc.

    // TODO: here we need more logic, to pass the new feeling on to the backend and store it there
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
        fetchFeelings,
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
