import { set, sub } from "date-fns";
import { createContext, useContext, useState, useEffect } from "react";

const EmotionsContext = createContext();

const EmotionsProvider = ({ children }) => {
  // ----------------------------------- States---------------------------------
  const [feelingsFamilies, setFeelingsFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [subFeelings, setSubFeelings] = useState([]);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [customFeelings, setCustomFeelings] = useState([]); //NOTICE: not sure yet, if it needs to be an array here?

  // ---------------------Fetching Frontend Data------------------------

  // Function to fetch frontend emotions data from emotions.json, when loading the Page the first time
  const fetchFeelings = async () => {
    try {
      const response = await fetch("/src/data/emotions.json");
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

    // call the fetchFeelings function when the component is mounted:
    useEffect(() => {
      fetchFeelings();
    }, []);
  };
  // --------------------- Handle family selection -----------------------------

  // Function to handle the selection of a family and their sub-feelings

  const handleFamilySelect = (familyId) => {
    // we need a familyId to identify the selected family and fetch the corresponding sub-feelings; familyId is the id of the selected family (this id comes from the data in emotions.json)
    setSelectedFamily(familyId); // store the selected family in a state

    // When the user has selected a family, fetch the sub-feelings for the selected family:
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

  // TODO: Implement extra logic for fetching the custom-subfeelings and mixed feelings from the backend

  // --------------------- Handle subfeeling Selection ------------------------

  const handleFeelingSelect = (subfeeling) => {
    setSelectedFeeling(subfeeling);
    console.log("Selected Feeling:", subfeeling);
  };

  // --------------------- Handle Add Custom Feelings ------------------------

  const handleAddCustomFeeling = (newFeeling) => {
    if (newFeeling.trim() === "") {
      return; // early exit if the input is empty
    }

    // As we have objects for the standard subfeelings to list them in the SubfeelingsContainer, it might be useful to create an object for the custom feeling as well:
    const customFeelingsObject = {
      id: customFeelings.length, //TODO: Assigning a unique id? For the Standard-Subfeelings, it is the index of the array, because this array won´t change. But for the custom feelings, we might need a different approach?
      name: newFeeling,
    };

    // TODO: here we need more logic, to pass the new feeling on (not sure where to pass it yet)

    setCustomFeelings([...customFeelings, customFeelingsObject]); // add the new feeling to the existing array of custom feelings
    console.log("New custom feeling added:", newFeeling);

    setCustomFeelings("");
    // this clears the input field; the newly stored feeling will still be stored in the state variable newCustomFeeling, so no worries :-)
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
