export const handleAddCustomTag = (
  newTag,
  category,
  customTags,
  setCustomTags,
  standardTags,
  setTagError,
  onTagToggle,
  setNewTag
) => {
  // CHECKS FOR VALID INPUT:
  if (newTag.name.trim() === "") {
    return; // early exit if the input is empty
  }

  // remove whitespaces:
  newTag.name = newTag.name.trim();

  // only allow letters
  const regex = /^[a-zA-ZäöüÄÖÜß]+$/;
  if (!regex.test(newTag.name)) {
    setTagError({
      message: "Bitte gib nur Buchstaben ohne Leerzeichen ein.",
      category,
    });
    return;
  }

  // allowed length of the Tag
  if (newTag.name.length < 3 || newTag.name.length > 18) {
    setTagError({
      message: "Dein Wort darf 3 bis 18 Zeichen lang sein.",
      category,
    });
    return;
  }
  // Check for duplicates within the customTags for the selected category
  const isDuplicateToCustomTags = (customTags[category] || []).some(
    (tag) => tag.name.toLowerCase() === newTag.name.toLowerCase()
  );
  const isDuplicateToStandardTags = standardTags.some((tagList) => {
    return (
      tagList.singleStandardTags.some((name) => {
        return name.toLowerCase() === newTag.name.toLowerCase();
      }) && tagList.category === category
    );
  });
  if (isDuplicateToCustomTags || isDuplicateToStandardTags) {
    setTagError({
      message: "Dieses Wort existiert bereits.",
      category,
    });
    return;
  }

  // CREATE A NEW OBJECT FOR THE NEW CUSTOM Tag:
  const customTagsObject = {
    id: Date.now(), //TODO: find a better solution for assigning a unique id
    name: newTag.name,
    isDefault: false,
    isNew: true,
    category,
  };

  const updatedCustomTags = {
    ...customTags,
    [category]: [...(customTags[category] || []), customTagsObject],
  };

  setCustomTags(updatedCustomTags); // add the new Tag to custom Tags
  onTagToggle(customTagsObject); // select the new Tag after adding it
  setNewTag({ name: "", category: "" }); // clear input field for UX
  setTagError({ message: "", category: "" }); // clear error message
};
