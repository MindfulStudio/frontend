import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Delete from "/src/assets/icons/delete-2-svgrepo-com.svg";

//++ import EmotionsProvider
import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useUserContext } from "../../../utils/UserProvider";

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
  const { handleDeactivateCustom } = useUserContext();

  useEffect(() => {
    setNewFeeling(""); // Reset "newFeeling" when "selectedFamily" changes (e.g. when the user types a new feeling, but then changes the family; this way the input field is cleared)
    console.log("input cleared because of family change");
  }, [selectedFamily, setNewFeeling]);

  return (
    <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px] overflow-y-scroll">
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
            <div key={feeling.id} className="flex items-center gap-0.1">
              <li
                onClick={() => handleFeelingSelect(feeling, false)} // we need to pass false, to indicate that this is a custom feeling
                className={`cursor-pointer  p-2 hover:bg-selected-subemotion hover:rotate-on-hover text-md ${
                  selectedFeeling?.id === feeling.id //selectedFeeling? means that we check if selectedFeeling is not null or undefined and then we check if the id of the selected feeling matches the id of the current feeling in the map
                    ? "bg-selected-subemotion"
                    : ""
                }`}
              >
                {feeling.name}
              </li>
              {feeling && !feeling.isNew && (
                <Button
                  variant="ghost"
                  size="icon"
                  className=" w-5 h-5 relative rounded-full hover:bg-gray-300"
                  onClick={() =>
                    handleDeactivateCustom(feeling.name, "emotion")
                  }
                >
                  <Delete className="w-4 h-4 absolute" />
                </Button>
              )}
            </div>
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
    </Card>
  );
};

export default FeelingsSelector;

/* NOTICE: bg-selected-subemotion is a custom color, which is defined in tailwind-config.js */
/* NOTICE: rotate-on-hover is a custom class, which is defined in tailwind-config.js! */
