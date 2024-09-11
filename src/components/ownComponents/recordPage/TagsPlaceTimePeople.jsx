import { useEffect, useState } from "react";

// fetch tags from src/data/standardTags.json
// TODO: => to be extracted to a Provider
const fetchStandardTags = async () => {
  try {
    const response = await fetch("/src/data/standardTags.json");

    if (!response.ok) {
      throw new Error(`Error fetching standard tags data`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching standard tags data:", error);
    return [];
  }
};

//++ import EmotionsProvider
import { useEmotionsContext } from "@/utils/EmotionsProvider";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "postcss";
import InputAndButtonForCustomTag from "./InputAndButtonForCustomTag";

const TagsPlaceTimePeople = () => {
  const { selectedFeeling, selectedFamily } = useEmotionsContext();

  // TODO: extract to a Provider
  const [standardTags, setStandardTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]); //  stores the list of currently selected tags

  // TODO: implement custom tag creation (maybe later on in the Provider)
  /* const [customTags, setCustomTags] = useState([]);
  const [newTag, setNewTag] = useState(""); */

  useEffect(() => {
    const loadStandardTags = async () => {
      const data = await fetchStandardTags();
      setStandardTags(data);
    };
    loadStandardTags();
  }, []);

  // Handle selecting/deselecting tags
  // TODO: this function will be provided by the Provider later on, because we also use it in TagsContext.jsx
  const handleTagToggle = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      // prevSelectedTags is the previous state of the selectedTags array

      const isSelected = prevSelectedTags.includes(tag); // check if the tag is already selected (it has been clicked before)...

      if (isSelected) {
        // if the tag is already in the array
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag); // ...remove it from the array
        // This creates a new array that includes all the tags from prevSelectedTags except the one that matches tag. It filters out the selected tag, effectively deselecting it.
      }
      return [...prevSelectedTags, tag]; // if the tag is not in the array, add it to the array
    });
  };

  // The renderTags function takes a category as a parameter (e.g. “when”, “where”) and searches the standardTags array to find the matching object with the desired category. As soon as the matching object has been found, it renders the singleStandardTags as li elements
  // TODO: extract to a Provider, we use this function in TagsContext.jsx as well
  const renderTagListbyCategory = (category) => {
    const categoryTags = standardTags.find((tag) => tag.category === category);

    return categoryTags ? (
      <ToggleGroup type="multiple" className="flex flex-wrap gap-3">
        {categoryTags.singleStandardTags.map((tag, index) => (
          <ToggleGroupItem
            key={index}
            value={tag}
            aria-label={tag}
            className={`cursor-pointer p-2 border ${
              selectedTags.includes(tag) ? "bg-selected-subemotion" : ""
            } `}
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </ToggleGroupItem>
          /* TODO: Add another ToggleGroupItem for the customtags */
        ))}
      </ToggleGroup>
    ) : (
      // styling not yet fixed; for now, I´ve applied same styling as for the feelings
      // TODO: implement tag selection
      <p>Keine Tags gefunden</p>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* <h2> {selectedFamily}</h2> for debugging*/}
      <section
        className="mt-16 flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        <h2>
          Wann hast du dich{" "}
          <span className="font-bold">{selectedFeeling.name}</span> gefühlt?
        </h2>
        <div className="w-[290px] bg-white p-[22px] text-center  mt-5 mb-7 h-[423px/3] overflow-y-scroll">
          <ul
            className="flex flex-wrap gap-3 justify-center list-none p-0"
            onClick={() => console.log("clicked")}
          >
            {renderTagListbyCategory("wann")}
          </ul>
          <InputAndButtonForCustomTag />
        </div>

        <p>
          Wo hast du dich
          <span className="font-bold"> {selectedFeeling.name}</span> gefühlt?
        </p>
        <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll">
          <ul
            className="flex flex-wrap gap-3 justify-center list-none p-0"
            onClick={() => console.log("clicked")}
          >
            {renderTagListbyCategory("wo")}
          </ul>
          <InputAndButtonForCustomTag />
        </div>

        <p>
          Mit wem hast du dich
          <span className="font-bold"> {selectedFeeling.name} </span>
          gefühlt?
        </p>
        <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px/3] overflow-y-scroll">
          <ul
            className="flex flex-wrap gap-3 justify-center list-none p-0"
            onClick={() => console.log("clicked")}
          >
            {renderTagListbyCategory("mitWem")}
          </ul>
          <InputAndButtonForCustomTag />
        </div>
      </section>
    </div>
  );
};

export default TagsPlaceTimePeople;
