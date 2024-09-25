// -------------------- import Context --------------------------------
import { useTagContext } from "@/utils/TagProvider";

export const InputAndButtonForCustomTag = ({ category }) => {
  // ------------------------------- States from Contexts -----------------------
  const { handleAddCustomTag, newTag, setNewTag, setTagError } =
    useTagContext();

  // ------------------------------- Render --------------------------------------
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
        className="rounded-sm border mb-2"
      />
    </div>
  );
};

export default InputAndButtonForCustomTag;
