// ------------------------------- importing components and context -------------------------------
// components:
import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";
// contect providers:
import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useMetricsContext } from "@/utils/MetricsProvider";

// ------------------------------- SelectFeelingsInStatisticOne Component -------------------------------
// this component allows users to select one of the feelings families and highlights the selected option
const SelectFeelingsInStatisticOne = () => {
  // destructure values from EmotionsContext
  const { feelingsFamilies } = useEmotionsContext(); //retrieve list of feelings families
  // destructure values from MetricsContext
  const { selectedFeelingsFamily, setSelectedFeelingsFamily } =
    useMetricsContext(); // retriev selected feelings family and function to update it

  // ------------------------------- helper function select feelings familiy -------------------------------
  // function to hanlde the selection of a feelings family
  const handleSelectFeelingsFamily = (familyId) => {
    try {
      setSelectedFeelingsFamily(familyId); // set selected family in context state
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // ------------------------------- helper function button opacity -------------------------------
  // helper function to dynamically apply opacity based on the selected family
  const getButtonOpacity = (familyId) => {
    return selectedFeelingsFamily === familyId ? "opacity-100" : "opacity-50";
  };

  // ------------------------------- Return JSX -------------------------------
  return (
    <div className="mt-5 grid grid-cols-3 grid-rows-2 ">
      {/* feelings family: Anspannung */}
      <button
        className={`flex flex-col items-center row-span-1 col-span-2 justify-start  ${getButtonOpacity(
          feelingsFamilies[0].id
        )}`}
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

      {/* feelings family: gemischte Gefühle */}
      <button
        className={`flex flex-col col-span-1 row-span-1 items-start justify-center min-w-[33%] ${getButtonOpacity(
          feelingsFamilies[4].id
        )}`}
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

      {/* feelings family: Trauer */}
      <button
        className={`flex flex-col col-span-1 row-span-1 items-start justify-start min-w-[33%] ${getButtonOpacity(
          feelingsFamilies[3].id
        )}`}
        onClick={() => handleSelectFeelingsFamily(feelingsFamilies[3].id)}
      >
        <IlluTrauer className="flex-shrink-0 w-[24.7px] h-[61px] ml-3" />
        <HighlightText highlighttext="Trauer" fontsize="text-sm ml-3" />
      </button>

      {/* feelings family: Entspannung */}
      <button
        className={`flex flex-col col-span-1 row-span-1  items-center justify-center pb-[63px] min-w-[33%] ${getButtonOpacity(
          feelingsFamilies[2].id
        )}`}
        onClick={() => handleSelectFeelingsFamily(feelingsFamilies[2].id)}
      >
        <IlluEntspannung className=" w-[112.2px] h-[19.6px] " />
        <HighlightText highlighttext="Entspannung" fontsize="text-sm" />
      </button>

      {/* feelings family: Freude */}
      <button
        className={`flex flex-col items-center row-span-1 col-span-1 justify-start ${getButtonOpacity(
          feelingsFamilies[1].id
        )}`}
        onClick={() => handleSelectFeelingsFamily(feelingsFamilies[1].id)}
      >
        <IlluFreude className="flex-shrink-0 w-[49px] h-[61.5px]" />
        <HighlightText highlighttext="Freude" fontsize="text-sm" />
      </button>
    </div>
  );
};

export default SelectFeelingsInStatisticOne;
