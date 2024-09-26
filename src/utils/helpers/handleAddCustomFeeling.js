export const handleAddCustomFeeling = (
  newFeeling,
  customFeelings,
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
    // TODO: Implement User Feedback in the UI
    setNewFeelingError({
      message: "Dein Gefühl darf zwischen 3 und 18 Zeichen lang sein.",
    });
    return;
  }

  // Check for duplicates within the customfeelings for the selected family
  // TODO: Refactor Logic for checking if the new feeling is already in the database and prevent duplicates, also check for not allowed characters etc.
  const isDuplicate = (customFeelings[selectedFamily] || []).some(
    (feeling) => feeling.name.toLowerCase() === newFeeling.toLowerCase()
  );
  if (isDuplicate) {
    setNewFeelingError({
      message: "Dieses Gefühl existiert bereits.",
    });
    return; // early exit if the feeling already exists
  }

  // Create a new custom feeling object
  const customFeelingsObject = {
    id: Date.now(), //TODO: Assigning an unique and useful id; For the Standard-Subfeelings, it is the index of the array, because this array won´t change. But for the custom feelings, we might need a different approach? I suggest Date.now() for now, but we should discuss this to find a better solution.
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
};
