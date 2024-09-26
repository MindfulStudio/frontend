import DeleteWhite from "/src/assets/icons/delete-2-svgrepo-com-white.svg";
import Delete from "/src/assets/icons/delete-2-svgrepo-com.svg";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useTagContext } from "../../../utils/contexts/TagProvider";
import { useUserContext } from "../../../utils/contexts/UserProvider";

// Render the tags of a selected category:
export const RenderTagListbyCategory = (category) => {
  const { standardTags, customTags, selectedTags, onTagToggle } =
    useTagContext();
  const { handleDeactivateCustom } = useUserContext();

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
            data-state={selectedTags.some((t) => t.name === tag) ? "on" : ""}
            onClick={() =>
              onTagToggle({
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
              data-state={
                selectedTags.some((t) => t.name === tag.name) ? "on" : ""
              }
              onClick={() => onTagToggle(tag)}
            >
              {tag.name}
            </ToggleGroupItem>
            {tag && !tag.isNew && (
              <Button
                variant="ghost"
                size="icon"
                className=" w-5 h-5 relative rounded-full hover:bg-gray-300"
                onClick={() => handleDeactivateCustom(tag.name, "tag")}
              >
                <Delete className="w-4 h-4 absolute" />
              </Button>
            )}
          </div>
        ))}
      </ToggleGroup>
    </div>
  ) : (
    // styling not yet fixed; for now, I´ve applied same styling as for the Tags
    <p>Keine Tags gefunden</p>
  );
};
