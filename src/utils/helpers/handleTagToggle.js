// Handle the selection of a tag:
export const handleTagToggle = (prevSelectedTags, tag) => {
  // check if tag is already selected:
  const isSelected = prevSelectedTags.some((t) => t.name === tag.name);
  // if tag is already selected, remove it from the array:
  if (isSelected) {
    return prevSelectedTags.filter(
      (selectedTag) => selectedTag.name !== tag.name
    );
  }
  // if tag was not already selected, add it to the array:
  return [...prevSelectedTags, tag];
};
