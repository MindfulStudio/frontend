import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserProvider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import defaultTags from "../data/standardTags.json";
import { useEmotionsContext } from "./EmotionsProvider";

const TagContext = createContext();

const TagProvider = ({ children }) => {
  // Local States:
  const [standardTags, setStandardTags] = useState(defaultTags);
  const [selectedTags, setSelectedTags] = useState([]); // currently selected tags
  const [newTag, setNewTag] = useState({ name: "", category: "" });

  // States from UserProvider:
  const { customTags, setCustomTags } = useUserContext();
  const { selectedFeeling } = useEmotionsContext();

  // Reset selected tags when a new feeling is selected:
  useEffect(() => {
    console.log("test");
    if (selectedFeeling) {
      console.log("hallo");
      setSelectedTags([]);
    }
  }, [selectedFeeling]);

  // Handle selecting/deselecting tags
  const handleTagToggle = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      // prevSelectedTags is the previous state of the selectedTags array

      const isSelected = prevSelectedTags.some((t) => t.name === tag.name); // check if the tag is already selected (it has been clicked before)...

      if (isSelected) {
        // if the tag is already in the array
        return prevSelectedTags.filter(
          (selectedTag) => selectedTag.name !== tag.name
        ); // ...remove it from the array
        // This creates a new array that includes all the tags from prevSelectedTags except the one that matches tag. It filters out the selected tag, effectively deselecting it.
      }
      return [...prevSelectedTags, tag]; // if the tag is not in the array, add it to the array
    });
    console.log("selected Tags:", selectedTags);
  };

  // The renderTags function takes a category as a parameter (e.g. “when”, “where”) and searches the standardTags array to find the matching object with the desired category. As soon as the matching object has been found, it renders the singleStandardTags as li elements
  const renderTagListbyCategory = (category) => {
    const categoryTags = standardTags.find((tag) => tag.category === category);
    const categoryTagsCustom = customTags[category];
    console.log(categoryTags);

    return categoryTags || categoryTagsCustom ? (
      <div>
        <ToggleGroup type="multiple" className="flex flex-wrap gap-3">
          {categoryTags.singleStandardTags.map((tag, index) => (
            <ToggleGroupItem
              key={index}
              value={tag}
              aria-label={tag}
              className={`cursor-pointer p-2 border ${
                selectedTags.includes(tag) ? "bg-selected-subemotion" : ""
              } `}
              onClick={() =>
                handleTagToggle({
                  name: tag,
                  isDefault: true,
                  category: category,
                })
              }>
              {tag}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ToggleGroup type="multiple" className="flex flex-wrap gap-3">
          {categoryTagsCustom?.map((tag, index) => (
            <ToggleGroupItem
              key={index}
              value={tag.name}
              aria-label={tag.name}
              className={`cursor-pointer p-2 border ${
                selectedTags.includes(tag) ? "bg-selected-subemotion" : ""
              } `}
              onClick={() => handleTagToggle(tag)}>
              {tag.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    ) : (
      // styling not yet fixed; for now, I´ve applied same styling as for the Tags
      <p>Keine Tags gefunden</p>
    );
  };

  // --------------------- Handle Add Custom Tags ------------------------

  const handleAddCustomTag = (newTag, category) => {
    // CHECKS FOR VALID INPUT:

    if (newTag.name.trim() === "") {
      return; // early exit if the input is empty
    }

    // remove whitespaces:
    newTag.name = newTag.name.trim();

    // only allow letters
    const regex = /^[a-zA-ZäöüÄÖÜß]+$/;
    if (!regex.test(newTag.name)) {
      // TODO: Implement User Feedback in the UI
      console.log("Invalid input:", newTag.name);
      return;
    }

    // allowed length of the Tag
    if (newTag.name.length < 3 || newTag.name.length > 18) {
      // TODO: Implement User Feedback in the UI
      console.log("Invalid length:", newTag.name);
      return;
    }

    // Check for duplicates within the customTags for the selected category
    // TODO: Refactor Logic for checking if the new Tag is already in the database and prevent duplicates, also check for not allowed characters etc.
    const isDuplicate = (customTags[category] || []).some(
      (tag) => tag.name.toLowerCase() === newTag.name.toLowerCase()
    );
    if (isDuplicate) {
      console.log("Tag already exists:", newTag.name);
      // TODO: Implement User Feedback in the UI
      return; // early exit if the Tag already exists
    }

    // CREATE A NEW OBJECT FOR THE NEW CUSTOM Tag:
    const customTagsObject = {
      id: Date.now(), //TODO: Assigning an unique and useful id; For the Standard-SubTags, it is the index of the array, because this array won´t change. But for the custom Tags, we might need a different approach? I suggest Date.now() for now, but we should discuss this to find a better solution.
      name: newTag.name,
      isDefault: false,
    };

    const updatedCustomTags = {
      ...customTags,
      [category]: [...(customTags[category] || []), customTagsObject],
    };

    setCustomTags(updatedCustomTags); // add the new Tag to the existing array of custom Tags;
    console.log("New custom Tag added:", newTag.name);
    setNewTag({ name: "", category: "" }); // clear the input field for a good UX
  };

  return (
    <TagContext.Provider
      value={{
        selectedTags,
        setSelectedTags,
        renderTagListbyCategory,
        handleTagToggle,
        handleAddCustomTag,
        newTag,
        setNewTag,
      }}>
      {children}
    </TagContext.Provider>
  );
};

export default TagProvider;

export const useTagContext = () => useContext(TagContext);
