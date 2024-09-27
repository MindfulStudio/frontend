export const handleAddCustomFeeling = (
  newFeeling,
  customFeelings,
  defaultEmotions,
  selectedFamily,
  setCustomFeelings,
  handleFeelingSelect,
  setNewFeelingError,
  setNewFeeling
) => {
  // CHECKS FOR VALID INPUT:

  if (newFeeling.trim() === "") {
    return; // early exit if the input is empty
  }

  // remove whitespaces:
  newFeeling = newFeeling.trim();

  // only allow letters
  const regex = /^[a-zA-ZäöüÄÖÜß]+$/;
  if (!regex.test(newFeeling)) {
    setNewFeelingError({
      message: "Bitte gib nur Buchstaben ohne Leerzeichen ein.",
    });
    return;
  }

  // allowed length of the feeling
  if (newFeeling.length < 3 || newFeeling.length > 18) {
    setNewFeelingError({
      message: "Dein Gefühl darf zwischen 3 und 18 Zeichen lang sein.",
    });
    return;
  }

  // Check for duplicates within the customfeelings for the selected family

  const isDuplicateToCustomEmotions = (
    customFeelings[selectedFamily] || []
  ).some((feeling) => feeling.name.toLowerCase() === newFeeling.toLowerCase());

  const isDuplicateToStandardEmotions = defaultEmotions.some((emotionsList) => {
    return (
      emotionsList.singleEmotions.some((name) => {
        return name.toLowerCase() === newFeeling.toLowerCase();
      }) && emotionsList.emotionFamily === selectedFamily
    );
  });

  if (isDuplicateToStandardEmotions || isDuplicateToCustomEmotions) {
    setNewFeelingError({
      message: "Dieses Gefühl existiert bereits.",
    });
    return; // early exit if the feeling already exists
  }

  // Create a new custom feeling object
  const customFeelingsObject = {
    id: Date.now(), //TODO: find a better solution for assigning a unique id
    name: newFeeling,
    isNew: true,
    isDefault: false, // custom feeling
  };

  const updatedCustomFeelings = {
    ...customFeelings,
    [selectedFamily]: [
      ...(customFeelings[selectedFamily] || []),
      customFeelingsObject,
    ],
  };

  setCustomFeelings(updatedCustomFeelings); // add the new feeling to existing list
  handleFeelingSelect(customFeelingsObject, false); // select the new custom feeling
  setNewFeeling(""); // clear input field for UX
  setNewFeelingError({ message: "" }); // clear error message
};
