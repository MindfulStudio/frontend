import { useEffect } from "react";

//++ import EmotionsProvider
import { useEmotionsContext } from "@/utils/EmotionsProvider";

const FeelingsSelector = () => {
  const {
    subFeelings,
    handleFeelingSelect,
    newFeeling,
    setNewFeeling,
    handleAddCustomFeeling,
    customFeelings,
    selectedFamily,
    selectedFeeling,
  } = useEmotionsContext();

  useEffect(() => {
    setNewFeeling(""); // Reset "newFeeling" when "selectedFamily" changes (e.g. when the user types a new feeling, but then changes the family; this way the input field is cleared)
    console.log("input cleared because of family change");
  }, [selectedFamily, setNewFeeling]);

  return (
    <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px] overflow-y-scroll">
      <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
        {/* map through all the subemotions and display them in a list: */}
        {subFeelings.map((feeling) => (
          <li
            key={feeling.id}
            onClick={() => handleFeelingSelect(feeling)}
            className={`cursor-pointer  p-2 hover:bg-selected-subemotion hover:rotate-on-hover text-md ${
              selectedFeeling?.id === feeling.id ? "bg-selected-subemotion" : ""
            }`}
          >
            {feeling.name}
          </li>
        ))}
      </ul>

      {/* map through all the custom subemotions and display them in another list (user won´t see, that there are two lists); 
      // We could join everything to one list, but this means a bit more complex refactoring and for the moment, this is a more clear, flexible and pragmatic approach */}
      <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
        {/* Show the user-defined custom features of the selected family */}
        {(customFeelings[selectedFamily] || []).map(
          (
            feeling // if there are no custom feelings, we map through an empty array, which means, that nothing is displayed
          ) => (
            <li
              key={feeling.id}
              onClick={() => handleFeelingSelect(feeling, true)} // we need to pass true, to indicate that this is a custom feeling
              className={`cursor-pointer  p-2 hover:bg-selected-subemotion hover:rotate-on-hover text-md ${
                selectedFeeling?.id === feeling.id
                  ? "bg-selected-subemotion"
                  : ""
              }`}
            >
              {feeling.name}
            </li>
          )
        )}
      </ul>

      {/* Add custom feeling */}
      <div className="mt-4">
        <button
          onClick={() => handleAddCustomFeeling(newFeeling)}
          className="w-10 h-10 border rounded-full"
        >
          +
        </button>
        <input
          type="text"
          value={newFeeling}
          onChange={(e) => setNewFeeling(e.target.value)}
          className=" p-3 rounded-sm border"
          style={{ width: `${newFeeling.length + 1}ch` }}
        />
      </div>
    </div>
  );
};

export default FeelingsSelector;

/* NOTICE: bg-selected-subemotion is a custom color, which is defined in tailwind-config.js */
/* NOTICE: rotate-on-hover is a custom class, which is defined in tailwind-config.js! */
