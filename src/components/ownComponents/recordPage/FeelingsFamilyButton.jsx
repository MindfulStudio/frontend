import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";

import SubFeelingsSelector from "./SubFeelingsSelector.jsx";

const FeelingsFamilyButton = ({
  feelingsFamilies, // = an array of emotionfamily-objects with id and name properties
  onSelectedFamily,
  subFeelings,
  handleFeelingSelect,
  selectedFamily,
}) => {
  const handleSelection = (familyId) => {
    onSelectedFamily(familyId);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-4">
        {/* Anspannung */}
        <button
          className="flex flex-col items-start row-span-2 col-span-2 justify-end"
          key={feelingsFamilies[0].id}
          onClick={() => handleSelection(feelingsFamilies[0].id)}
          /* feelingsFamilies[0].id = the value for id in the first emotionobject in the array called feelingsFamilies, which comes from the fetchFeelings function and the setFeelingsFamilies-State*/
        >
          <div className="flex flex-col items-center">
            <IlluAnspannung className="flex-shrink-0" />
            <HighlightText highlighttext="Anspannung" fontsize="text-sm" />
          </div>
        </button>

        {/* Freude */}
        <button
          className="flex flex-col items-center row-span-2 justify-start"
          key={feelingsFamilies[1].id}
          onClick={() => handleSelection(feelingsFamilies[1].id)}
        >
          <IlluFreude className="flex-shrink-0" />
          <HighlightText highlighttext="Freude" fontsize="text-sm" />
        </button>
      </div>

      {/* -----------------SubFeelingsSelector--------------------- */}
      <div>
        {selectedFamily && (
          <SubFeelingsSelector
            subFeelings={subFeelings}
            onSelectFeeling={handleFeelingSelect}
          />
        )}
      </div>
      {/* --------------------------------------------------------- */}

      <div className="flex flex-row gap-4 items-end">
        {/* gemischte Gefühle */}
        <button
          className="flex flex-col items-center justify-center pl-7"
          key={feelingsFamilies[4].id}
          onClick={() => handleSelection(feelingsFamilies[4].id)}
        >
          <div className="flex flex-col items-center">
            <IlluGemischteGefühle className="flex-shrink-0" />
            <HighlightText
              highlighttext="gemischte Gefühle"
              fontsize="text-sm"
            />
          </div>
        </button>

        {/* Entspannung */}
        <button
          className="flex flex-col items-center justify-center pl-7 mb-4"
          key={feelingsFamilies[2].id}
          onClick={() => handleSelection(feelingsFamilies[2].id)}
        >
          <IlluEntspannung className="flex-shrink-0" />
          <HighlightText highlighttext="Entspannung" fontsize="text-sm" />
        </button>

        {/* Trauer */}
        <button
          className="flex flex-col items-center justify-center"
          key={feelingsFamilies[3].id}
          onClick={() => handleSelection(feelingsFamilies[3].id)}
        >
          <IlluTrauer className="flex-shrink-0" />
          <HighlightText highlighttext="Trauer" fontsize="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default FeelingsFamilyButton;

/* First Approach (does not work) */
/*
const FeelingsFamilyButton = ({ feelingsFamilies, onSelectedFamily }) => (
  <div className="mb-6 text-center">
    {feelingsFamilies.map((family) => (
      <button
        key={family.id}
        onClick={() => onSelectedFamily(family.id)}
        className=" text-black px-4 py-2 rounded-lg m-2"
      >
        {family.name}
        
        // <div className="flex flex-col items-center">
          // <IlluAnspannung className="flex-shrink-0" />
          // <HighlightText highlighttext="Anspannung" fontsize="text-md" />
        // </div>
      // </button>
    ))}
  </div>
);
*/