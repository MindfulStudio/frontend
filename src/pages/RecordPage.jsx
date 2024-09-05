import React, { useEffect, useState } from "react";
import FeelingsFamilyButton from "@/components/ownComponents/recordPage/FeelingsFamilyButton";

const RecordPage = () => {
  const [feelingsFamilies, setFeelingsFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [subFeelings, setSubFeelings] = useState([]);
  const [selectedFeeling, setSelectedFeeling] = useState(null); // store the selected feeling in a state variable; selectedFeeling itself is not used in the UI, but it is used to store the selected feeling and to pass it to the parent component

  // Fetch emotions data from emotions.json, when loading the Page the first time
  useEffect(() => {
    const fetchFeelings = async () => {
      try {
        const response = await fetch("/src/data/emotions.json");
        const data = await response.json(); // Parse JSON data and store it in data, which is an array of objects; every object represents an emotion family

        // Extract the emotion families from the data, to use them for the FeelingsFamilyButton component:
        const families = data.map((family) => ({
          id: family.emotionFamily,
          name: family.emotionFamily,
          // this step creates an Array with several emotionfamily-objects. Every emotionfamily object gets an id and name property with the same value: the emotion family name; this is done to make the data structure compatible with the FeelingsFamilyButton component
        }));

        setFeelingsFamilies(families); // Set the extracted emotion families in the state variable feelingsFamilies to use them in the FeelingsFamilyButton component
      } catch (error) {
        console.error("Error fetching emotions data:", error);
      }
    };

    fetchFeelings();
  }, []);

  // When the user selects a family, fetch the sub-feelings for the selected family:

  // we need a familyId to identify the selected family and fetch the corresponding sub-feelings; familyId is the id of the selected family (this id comes from the data in emotions.json)

  // TODO: Implement extra logic for fetching the custom-subfeelings and mixed feelings from the backend

  const handleFamilySelect = (familyId) => {
    setSelectedFamily(familyId); // store the selected family in a state

    // Fetch the sub-feelings for the selected family
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
            (subemotion, index) => ({
              id: index,
              name: subemotion,
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
        setSelectedFeeling(null); // Reset selected feeling when changing family
      })
      .catch((error) => console.error("Error fetching emotions data:", error));
  };

  // When the user selects a feeling, store the selected feeling in the state variable selectedFeeling
  const handleFeelingSelect = (feeling) => {
    setSelectedFeeling(feeling);
    console.log("Selected Feeling:", feeling);
  };

  return (
    <main className="pt-[109px] px-[50px] flex flex-col items-center">
      <div>
        {feelingsFamilies.length > 0 && (
          <FeelingsFamilyButton
            feelingsFamilies={feelingsFamilies}
            onSelectedFamily={handleFamilySelect}
            selectedFamily={selectedFamily}
            subFeelings={subFeelings}
            onSelectedFeeling={handleFeelingSelect}
          />
        )}
      </div>
    </main>
  );
};

export default RecordPage;
