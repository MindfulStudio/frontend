import { useState } from "react";

const SubFeelingsSelector = ({
  subFeelings,
  onSelectedFeeling,
  /* onAddNewCustomFeeling */
}) => {
  const [newCustomFeeling, setNewCustomFeeling] = useState("");

  const handleAddNewCustomFeeling = () => {
    if (newCustomFeeling.trim() === "") {
      return; // early exit if the input is empty
    }
    /*NOTICE:  Logic for updating the custom feelings missing */
    /*   onAddNewCustomFeeling(newCustomFeeling);  */
    // function for passing the new feeling on (not sure where to pass yet and not implemented yet)

    setNewCustomFeeling(""); // clear the input field
  };

  return (
    <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px] overflow-y-auto">
      <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
        {/* map through all the subemotions and display them in a list: */}
        {subFeelings.map((feeling) => (
          <li
            key={feeling.id}
            onClick={() => onSelectedFeeling(feeling)}
            className="cursor-pointer rounded-sm p-2 hover:bg-selected-subemotion hover:rotate-on-hover text-md"
          >
            {feeling.name}
          </li>
        ))}
      </ul>
      {/* Add custom feeling */}
      <div className="mt-4">
        <button
          onClick={handleAddNewCustomFeeling}
          className="w-10 h-10 border rounded-full"
        >
          +
        </button>
        <input
          type="text"
          value={newCustomFeeling}
          onChange={(e) => setNewCustomFeeling(e.target.value)}
          className=" p-3 rounded-sm border"
          style={{ width: `${newCustomFeeling.length + 1}ch` }}
        />
      </div>
    </div>
  );
};

export default SubFeelingsSelector;

/* NOTICE: hover:bg-selected-subemotion is a custom color, which is defined in tailwind-config.js */
/* NOTICE: hover:rotate-on-hover is a custom class, which is defined in tailwind-config.js! */
