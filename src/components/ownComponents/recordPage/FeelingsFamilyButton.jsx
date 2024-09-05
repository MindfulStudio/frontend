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
  onSelectedFeeling,
  selectedFamily,
}) => {
  const handleSelection = (familyId) => {
    onSelectedFamily(familyId);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-[182px]">
        {/* Anspannung */}
        <button
          className="flex flex-col items-start row-span-2 col-span-2 justify-end"
          key={feelingsFamilies[0].id}
          onClick={() => handleSelection(feelingsFamilies[0].id)}
          /* feelingsFamilies[0].id = the value for id in the first emotionobject in the array called feelingsFamilies, which comes from the fetchFeelings function and the setFeelingsFamilies-State*/
        >
          <div className="flex flex-col items-center">
            <IlluAnspannung
              className=" w-[56.5px] h-[57.6px]"
              /* Change Size of the Icon individually */
            />
            <HighlightText highlighttext="Anspannung" fontsize="text-sm" />
          </div>
        </button>

        {/* Freude */}
        <button
          className="flex flex-col items-center row-span-2 justify-start"
          key={feelingsFamilies[1].id}
          onClick={() => handleSelection(feelingsFamilies[1].id)}
        >
          <IlluFreude className="flex-shrink-0 w-[49px] h-[61.5px]" />
          <HighlightText highlighttext="Freude" fontsize="text-sm" />
        </button>
      </div>

      {/* -----------------SubFeelingsSelector--------------------- */}
      {/* Styling is inside the component */}
      <div>
        {selectedFamily && (
          <SubFeelingsSelector
            subFeelings={subFeelings}
            onSelectedFeeling={onSelectedFeeling}
          />
        )}
      </div>
      {/* --------------------------------------------------------- */}

      <div className="flex flex-row items-center gap-3">
        {/* gemischte Gefühle */}
        <button
          className="flex flex-col items-center justify-center min-w-[33%]"
          key={feelingsFamilies[4].id}
          onClick={() => handleSelection(feelingsFamilies[4].id)}
        >
          <div className="flex flex-col items-center">
            <IlluGemischteGefühle className=" w-[33.2px] h-[47.8px]" />
            <div className="  transform -translate-x-1/6 whitespace-nowrap">
              {" "}
              {/* solution to position the text with a small overflow beyond the limits of the flexbox */}
              <HighlightText
                className="text-center"
                highlighttext="gemischte Gefühle"
                fontsize="text-sm"
              />
            </div>
          </div>
        </button>

        {/* Entspannung */}
        <button
          className="flex flex-col items-center justify-center  pb-[63px] min-w-[33%]"
          key={feelingsFamilies[2].id}
          onClick={() => handleSelection(feelingsFamilies[2].id)}
        >
          <IlluEntspannung className=" w-[112.2px] h-[19.6px] " />
          <HighlightText highlighttext="Entspannung" fontsize="text-sm" />
        </button>

        {/* Trauer */}
        <button
          className="flex flex-col items-center justify-center min-w-[33%]"
          key={feelingsFamilies[3].id}
          onClick={() => handleSelection(feelingsFamilies[3].id)}
        >
          <IlluTrauer className="flex-shrink-0 w-[24.7px] h-[61px] ml-3" />
          <HighlightText highlighttext="Trauer" fontsize="text-sm ml-3" />
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
