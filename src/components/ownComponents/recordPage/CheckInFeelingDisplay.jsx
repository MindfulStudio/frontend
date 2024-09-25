// ---------------------------- Icon Imports ----------------------------------
import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";

// --------------------------- Component Imports --------------------------------
import FeelingsSelector from "./FeelingsSelector.jsx";

// --------------------------- Context Imports ----------------------------------
import { useEmotionsContext } from "@/utils/EmotionsProvider";

const CheckInFeelingDisplay = () => {
  // ------------------------------- States from Contexts -----------------------
  const {
    feelingsFamilies, //!array of emotionfamily-objects with id and name properties
    handleFamilySelect,
    selectedFamily, //! id of the selected family
  } = useEmotionsContext();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-[182px]">
        {/* Anspannung */}
        <button
          className={`flex flex-col items-start row-span-2 col-span-2 justify-end  ${
            selectedFamily === feelingsFamilies[0].id
              ? "opacity-100"
              : "opacity-50"
          }`}
          onClick={() => handleFamilySelect(feelingsFamilies[0].id)}
        >
          <div className="flex flex-col items-center">
            <IlluAnspannung className=" w-[56.5px] h-[57.6px]" />
            <HighlightText highlighttext="Anspannung" fontsize="text-sm" />
          </div>
        </button>

        {/* Freude */}
        <button
          className={`flex flex-col items-center row-span-2 justify-start ${
            selectedFamily === feelingsFamilies[1].id
              ? "opacity-100"
              : "opacity-50"
          }`}
          onClick={() => handleFamilySelect(feelingsFamilies[1].id)}
        >
          <IlluFreude className="flex-shrink-0 w-[49px] h-[61.5px]" />
          <HighlightText highlighttext="Freude" fontsize="text-sm" />
        </button>
      </div>

      {/* ----------------- FeelingsSelector Subcomponent --------------------- */}
      <div>{selectedFamily && <FeelingsSelector />}</div>
      {/* --------------------------------------------------------- */}

      <div className="flex flex-row items-center gap-3 mt-3">
        {/* gemischte Gefühle */}
        <button
          className={`flex flex-col items-center justify-center min-w-[33%] ${
            selectedFamily === feelingsFamilies[4].id
              ? "opacity-100"
              : "opacity-50"
          }`}
          onClick={() => handleFamilySelect(feelingsFamilies[4].id)}
        >
          <div className="flex flex-col items-center">
            <IlluGemischteGefühle className=" w-[33.2px] h-[47.8px]" />
            <div className="transform -translate-x-1/6 whitespace-nowrap">
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
          className={`flex flex-col items-center justify-center pb-[63px] min-w-[33%] ${
            selectedFamily === feelingsFamilies[2].id
              ? "opacity-100"
              : "opacity-50"
          }`}
          onClick={() => handleFamilySelect(feelingsFamilies[2].id)}
        >
          <IlluEntspannung className=" w-[112.2px] h-[19.6px] " />
          <HighlightText highlighttext="Entspannung" fontsize="text-sm" />
        </button>

        {/* Trauer */}
        <button
          className={`flex flex-col items-center justify-center min-w-[33%] ${
            selectedFamily === feelingsFamilies[3].id
              ? "opacity-100"
              : "opacity-50"
          }`}
          onClick={() => handleFamilySelect(feelingsFamilies[3].id)}
        >
          <IlluTrauer className="flex-shrink-0 w-[24.7px] h-[61px] ml-3" />
          <HighlightText highlighttext="Trauer" fontsize="text-sm ml-3" />
        </button>
      </div>
    </div>
  );
};

export default CheckInFeelingDisplay;
