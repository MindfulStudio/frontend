import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const renderTagListbyCategoryMetrics = (
  category,
  standardTags,
  customTags,
  selectedTag,
  handleTagToggleMetric
) => {
  const categoryTags = standardTags.find((tag) => tag.category === category);
  const categoryTagsCustom = customTags[category];

  return categoryTags || categoryTagsCustom ? (
    <div>
      <ToggleGroup type="multiple" className="flex flex-wrap gap-3">
        {categoryTags.singleStandardTags.map((tag, index) => (
          <ToggleGroupItem
            key={index}
            value={tag}
            aria-label={tag}
            className={`cursor-pointer p-2 border`}
            data-state={selectedTag?.name === tag ? "on" : ""}
            onClick={() =>
              handleTagToggleMetric({
                name: tag,
                isDefault: true,
                category: category,
              })
            }
          >
            {tag}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup type="multiple" className="flex flex-wrap gap-3 mt-3">
        {categoryTagsCustom?.map((tag, index) => (
          <div key={index} className="flex items-center gap-1">
            <ToggleGroupItem
              key={index}
              value={tag.name}
              aria-label={tag.name}
              className={`cursor-pointer p-2 border `}
              data-state={selectedTag?.name === tag.name ? "on" : ""}
              onClick={() => handleTagToggle(tag)}
            >
              {tag.name}
            </ToggleGroupItem>
          </div>
        ))}
      </ToggleGroup>
    </div>
  ) : (
    // styling not yet fixed; for now, I´ve applied same styling as for the Tags
    <p>Keine Tags gefunden</p>
  );
};
