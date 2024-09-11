import { useState } from "react";

const handleAddCustomTag = () => {
  // This is the Function we want to use in the InputAndButtonForCustomTag.jsx Component to add a new custom tag to the customTags state
  // TODO: Finish this function
  // ATTENTION: This function is not finished yet, it is just a draft to show the idea of how we could implement it. We also need to write a few things differently, when we want to retrieve the used states later on from a Provider

  const handleAddCustomTag = (newTag) => {
    const [newTag, setNewTag] = useState("");
    const [customTags, setCustomTags] = useState([]);
    const [tagsCategory, setTagsCategory] = useState(""); // this will be the category of the tags, which we want to add; the logic might be similar to the handleAddCustomFeeling function in EmotionsProvider.jsx, but here we have tagcategories instead of selected feelingsfamilies

    if (newTag.trim() === "") {
      return;
    }

    newTag = newTag.trim();

    const regex = /^[a-zA-ZäöüÄÖÜß]+$/;
    if (!regex.test(newTag)) {
      console.log("Invalid input:", newTag);
      return;
    }

    if (newTag.length < 3 || newTag.length > 18) {
      // TODO: Implement User Feedback in the UI
      console.log("Invalid length:", newTag);
      return;
    }

    //TODO: create duplicate check

    const customTagsObject = {
      id: Date.now(),
      name: newTag,
      isDefault: false,
    };

    const updatedCustomTags = {
      ...customTagsObject,
      [tagsCategory]: [
        ...customTagsObject(customTags[tagsCategory] || []),
        customTagsObject,
      ],
    };

    setNewTag(updatedCustomTags);

    console.log("New Custom Tag:", newTag);

    return { newTag, setNewTag };
  };
};

export default handleAddCustomTag;
