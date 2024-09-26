import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserProvider.jsx";
import defaultTags from "../../data/standardTags.json";
import { useEmotionsContext } from "./EmotionsProvider.jsx";

// --------------------------- Icon Component Imports ---------------------------
import { handleTagToggle } from "../helpers/handleTagToggle.js";
import { handleAddCustomTag } from "../helpers/handleAddCustomTag.js";

// --------------------------- TagProvider -------------------------------------

const TagContext = createContext();

const TagProvider = ({ children }) => {
  // ----------------------------  Local States:----------------------------------
  const [standardTags, setStandardTags] = useState(defaultTags);
  const [selectedTags, setSelectedTags] = useState([]); // currently selected tags
  const [newTag, setNewTag] = useState({ name: "", category: "" });
  const [tagError, setTagError] = useState({ message: "", category: "" });

  // -------------------------- States from UserProvider --------------------------

  const { customTags, setCustomTags } = useUserContext();
  const { selectedFeeling } = useEmotionsContext();

  // -------------------------- Side Effects --------------------------------------
  // Reset everything when a new feeling is selected:
  useEffect(() => {
    if (selectedFeeling) {
      setSelectedTags([]);
      setNewTag({ name: "", category: "" });
      setTagError(null);
    }
  }, [selectedFeeling]);

  // -------------------------- Functions ----------------------------------------

  // Handle selecting/deselecting tags:
  const onTagToggle = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      return handleTagToggle(prevSelectedTags, tag);
    });
  };

  // Add a new custom tag:
  const onAddCustomTag = (newTag, category) => {
    handleAddCustomTag(
      newTag,
      category,
      customTags,
      setCustomTags,
      standardTags,
      setTagError,
      onTagToggle,
      setNewTag
    );
  };

  return (
    <TagContext.Provider
      value={{
        standardTags,
        customTags,
        selectedTags,
        setSelectedTags,
        onTagToggle,
        onAddCustomTag,
        newTag,
        setNewTag,
        tagError,
        setTagError,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export default TagProvider;

export const useTagContext = () => useContext(TagContext);
