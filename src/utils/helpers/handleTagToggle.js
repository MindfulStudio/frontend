export const handleTagToggle = (tag, 
    setSelectTag, 
    handleLoadStatisitcsTwo) => {
    setSelectTag((prevSelectedTag) => {
      // prevSelectedTag is the previous state of the selectedTag array
      const isSelected = prevSelectedTag?.name === tag.name; // check if the tag is already selected (it has been clicked before)...

      if (isSelected) {
        // if the tag is selected again it is deselected
        return null;
      } else {
        handleLoadStatisitcsTwo();
        return tag;
      }
    });
  };