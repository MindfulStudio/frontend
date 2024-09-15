import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";

import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useMetricsContext } from "@/utils/MetricsProvider";

const SelectFeelingsInStatisticOne = () => {
  // import from EmotionsContext:
  const { feelingsFamilies } = useEmotionsContext();
  // import from mreticsContext:
  const { selectedFeelingsFamily, setSelectedFeelingsFamily } =
    useMetricsContext();

  console.log({ feelingsFamilies });
  console.log({ selectedFeelingsFamily });

  // select FeelingsFamily:
  const handleSelectFeelingsFamily = (familyId) => {
    try {
      // save selected familyId:
      setSelectedFeelingsFamily(familyId);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="mt-5 grid grid-cols-3 grid-rows-2 ">
      {/* feelings familys: */}
      {/* Anspannung */}
      <button
        className={`flex flex-col items-center row-span-1 col-span-2 justify-start  ${
          selectedFeelingsFamily === feelingsFamilies[0].id
            ? "opacity-100"
            : "opacity-50"
        }`}
        // opacity is set dynamically. If selectedFamily matches ID of the feelingsFamily, button receives opacity-100, otherwise opacity-50.
        onClick={() => handleSelectFeelingsFamily(feelingsFamilies[0].id)}
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

      {/* gemischte Gefühle */}
      <button
        className={`flex flex-col col-span-1 row-span-1 items-start justify-center min-w-[33%] ${
          selectedFeelingsFamily === feelingsFamilies[4].id
            ? "opacity-100"
            : "opacity-50"
        }`}
        onClick={() => handleSelectFeelingsFamily(feelingsFamilies[4].id)}
      >
        <div className="flex flex-col items-center">
          <IlluGemischteGefühle className=" w-[33.2px] h-[47.8px]" />
          <div className="transform -translate-x-1/6 whitespace-nowrap">
            {/* solution to position the text with a small overflow beyond the limits of the flexbox */}
            <HighlightText
              className="text-center"
              highlighttext="gemischte Gefühle"
              fontsize="text-sm"
            />
          </div>
        </div>
      </button>

      {/* Trauer */}
      <button
        className={`flex flex-col col-span-1 row-span-1 items-start justify-start min-w-[33%] ${
          selectedFeelingsFamily === feelingsFamilies[3].id
            ? "opacity-100"
            : "opacity-50"
        }`}
        onClick={() => handleSelectFeelingsFamily(feelingsFamilies[3].id)}
      >
        <IlluTrauer className="flex-shrink-0 w-[24.7px] h-[61px] ml-3" />
        <HighlightText highlighttext="Trauer" fontsize="text-sm ml-3" />
      </button>

      {/* Entspannung */}
      <button
        className={`flex flex-col col-span-1 row-span-1  items-center justify-center pb-[63px] min-w-[33%] ${
          selectedFeelingsFamily === feelingsFamilies[2].id
            ? "opacity-100"
            : "opacity-50"
        }`}
        onClick={() => handleSelectFeelingsFamily(feelingsFamilies[2].id)}
      >
        <IlluEntspannung className=" w-[112.2px] h-[19.6px] " />
        <HighlightText highlighttext="Entspannung" fontsize="text-sm" />
      </button>

      {/* Freude */}
      <button
        className={`flex flex-col items-center row-span-1 col-span-1 justify-start ${
          selectedFeelingsFamily === feelingsFamilies[1].id
            ? "opacity-100"
            : "opacity-50"
        }`}
        onClick={() => handleSelectFeelingsFamily(feelingsFamilies[1].id)}
      >
        <IlluFreude className="flex-shrink-0 w-[49px] h-[61.5px]" />
        <HighlightText highlighttext="Freude" fontsize="text-sm" />
      </button>
    </div>
  );
};

export default SelectFeelingsInStatisticOne;
