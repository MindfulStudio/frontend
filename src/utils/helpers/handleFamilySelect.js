// --------------------- Handle family selection -----------------------------

// Function to handle the selection of a family and their sub-feelings
export const handleFamilySelect = (
  defaultEmotions,
  familyId,
  setSelectedFamily,
  setSubFeelings,
  setSelectedFeeling,
  setNewFeelingError
) => {
  setSelectedFamily(familyId);

  // Find the corresponding emotions family object in the data array, based on id:
  const selectedFamilyData = defaultEmotions.find(
    (family) => family.emotionFamily === familyId
  );

  if (!selectedFamilyData) {
    console.error(`No family found for the selected id: ${familyId}`);
    setSubFeelings([]); // Reset sub-feelings when no family is selected
    setSelectedFeeling(null); // reset the selected feeling when a new family is selected
    return; // early exit if no matching family is found
  }

  // Format and store the sub-feelings of the selected family
  const subFeelingsObject = selectedFamilyData.singleEmotions.map(
    (subfeeling, index) => ({
      id: index,
      name: subfeeling,
    })
  );
  setSubFeelings(subFeelingsObject);

  setSelectedFeeling(null); // reset the selected feeling
  setNewFeelingError({ message: "" }); // reset the new feeling error message
};
