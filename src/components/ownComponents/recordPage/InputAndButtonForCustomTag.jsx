import React from "react";

{
  /* TODO: create a state for new custom tags and write a function to add new tags in the Provider, (similarly to handleAddCustomFeelings) and use it here instead for onClick */
}
export const InputAndButtonForCustomTag = () => {
  return (
    <div className="mt-4">
      <button
        onClick={() => console.log("add custom tag")}
        className="w-7 h-7 border rounded-full"
      >
        +
      </button>
      <input
        type="text"
        value={
          "put variable here"
        } /* replace string with the state variable, i.e. newTag */
        onChange={(e) =>
          console.log("new tag")
        } /* replace clg with setter of the state variable and e.target.value, i.e. setNewTag(e.target.value) */
        className="rounded-sm border"
      />
    </div>
  );
};

export default InputAndButtonForCustomTag;
