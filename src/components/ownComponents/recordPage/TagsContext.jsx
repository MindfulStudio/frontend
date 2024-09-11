import React from "react";
import { useEffect, useState } from "react";

//++ import EmotionsProvider
import { useEmotionsContext } from "@/utils/EmotionsProvider";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { InputAndButtonForCustomTag } from "@/components/ownComponents/recordPage/InputAndButtonForCustomTag.jsx";

// fetch tags from src/data/standardTags.json
// TODO: => this is a duplicate of the fetchfunction in TagsPlaceTimePeople.jsx; to be extracted to a Provider
const fetchStandardTags = async () => {
  try {
    const response = await fetch("/src/data/standardTags.json");

    if (!response.ok) {
      throw new Error(`Error fetching standard tags data`);
    }
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching standard tags data:", error);
    return [];
  }
};

const TagsContext = () => {
  const { selectedFeeling, selectedFamily } = useEmotionsContext();

  // TODO: extract to a Provider
  const [standardContextTags, setStandardContextTags] = useState([]); // state will be the same as in TagsPlaceTimePeople.jsx (=> standardTags), when we extracted all the states for all the tags to a Provider
  const [selectedContextTags, setSelectedContextTags] = useState([]); // state will be the same as in TagsPlaceTimePeople.jsx (=> selected Tags), when we extracted all the states for all the tags to a Provider

  //TODO: implement custom tag creation (maybe later on in the Provider)
  // state will be the same as in TagsPlaceTimePeople.jsx, when we extracted all the states for all the tags to a Provider

  useEffect(() => {
    const loadStandardTags = async () => {
      const data = await fetchStandardTags();
      setStandardContextTags(data);
    };
    loadStandardTags();
  }, []);

  // Handle selecting/deselecting tags (this function will be provided by the Provider later on, because we also use it in TagsPlaceTimePeople.jsx)
  // TODO: this function will be provided by the Provider later on, because we also use it in TagsPlaceTimePeople.jsx
  const handleTagToggle = (tag) => {
    setSelectedContextTags((prevSelectedTags) => {
      const isSelected = prevSelectedTags.includes(tag);

      if (isSelected) {
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      }
      return [...prevSelectedTags, tag];
    });
  };

  // TODO: extract to a Provider, we use this function in TagsPlaceTimePeople.jsx as well
  const renderTagListbyCategory = (category) => {
    const categoryTags = standardContextTags.find(
      (tag) => tag.category === category
    );

    return categoryTags ? (
      <ToggleGroup type="multiple" className="flex flex-wrap gap-3">
        {categoryTags.singleStandardTags.map((tag, index) => (
          <ToggleGroupItem
            key={index}
            value={tag}
            aria-label={tag}
            className={`cursor-pointer p-2 border ${
              selectedContextTags.includes(tag) ? "bg-selected-subemotion" : ""
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
      <section className="mt-16 flex flex-col items-center">
        <h2>
          Womit könnte dein Gefühl{" "}
          <span className="font-bold">{selectedFeeling.name}</span> in
          Verbindung stehen?
        </h2>
        <div
          className="w-[290px] bg-white p-[22px] text-center mt-16 h-[423px] overflow-y-scroll"
          /*           style={{ zIndex: 10 }}
           */
        >
          {renderTagListbyCategory("was")}

          {/* Add custom tags */}
          <InputAndButtonForCustomTag />
        </div>
      </section>
    </div>
  );
};

export default TagsContext;
