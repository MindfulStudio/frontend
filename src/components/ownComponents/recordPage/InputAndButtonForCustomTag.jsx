import { useTagContext } from "@/utils/TagProvider";

export const InputAndButtonForCustomTag = ({ category }) => {
  const { handleAddCustomTag, newTag, setNewTag, tagError, setTagError } = useTagContext();

  return (
    <div className="mt-4">
      <button
        onClick={() => {
          if (category === newTag.category) {
            handleAddCustomTag(newTag, category);
          }
        }}
        className="w-7 h-7 border rounded-full"
      >
        +
      </button>
      <input
        type="text"
        value={category === newTag.category ? newTag.name : ""}
        onChange={(e) => {
          setTagError(null);
          setNewTag({ name: e.target.value, category: category });
        }}
        className="rounded-sm border"
      />
    </div>
  );
};

export default InputAndButtonForCustomTag;
