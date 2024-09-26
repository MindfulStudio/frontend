// ------------------------------- importing components and context -------------------------------
// components:
import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";
import { CardHeader } from "@/components/ui/card";
import MessageMetricsM1 from "./MessageMetricsM1";

// context providers:
import { useEmotionsContext } from "@/utils/contexts/EmotionsProvider";
import { useMetricsContext } from "@/utils/MetricsProvider";

// ------------------------------- SelectFeelingsFamily Component -------------------------------
// this component allows the user to select a feelings family and loads the corresponding statisitcs
const SelectFeelingsFamily = () => {
  // destructure values from EmotionsContext
  const { feelingsFamilies } = useEmotionsContext();
  // destructure values from MetricsContext
  const {
    showMetricsOne,
    metricsOneStatus,
    setMetricsOneStatus,
    maxMetricsOneStatus,
    setSelectedFeelingsFamily,
  } = useMetricsContext();

  // ------------------------------- Function for selecting family and loading statisticsOne-page -------------------------------
  // this function is called when feelings family is selected
  // it updates the status and sets the selected feelingsId for further processing
  const handleLoadStatisticsOne = (familyId) => {
    try {
      // only update status if it's within the allowed range
      if (metricsOneStatus <= maxMetricsOneStatus) {
        setMetricsOneStatus((prevStat) => prevStat + 1); // move to next step
      }
      // save selected familyId for future use
      setSelectedFeelingsFamily(familyId);
    } catch (error) {
      console.log("error: ", error);
      // NOTICE: maybe better error-handling? e.g. user feedback?
    }
  };

  // ------------------------------- Return JSX -------------------------------
  // display the content if showMetricsOne is ture, otherwise rendering nothing
  return (
    <div>
      {showMetricsOne && (
        <div>
          <CardHeader>
            <MessageMetricsM1 />
          </CardHeader>

          {/* grid layout to dislay the feelings families as selectable options */}
          <div className="mt-5 grid grid-cols-3 grid-rows-6 ">
            {/* feelings family: Anspannung */}
            <button
              className="flex flex-col items-start row-span-2 col-span-2 justify-end"
              onClick={() => handleLoadStatisticsOne(feelingsFamilies[0].id)}
            >
              <div className="flex flex-col items-center">
                <IlluAnspannung className="flex-shrink-0" />
                <HighlightText highlighttext="Anspannung" fontsize="text-md" />
              </div>
            </button>
            {/* feelings family: Freude */}
            <button
              className="flex flex-col items-center row-span-2 justify-start"
              onClick={() => handleLoadStatisticsOne(feelingsFamilies[1].id)}
            >
              <IlluFreude className="flex-shrink-0" />
              <HighlightText highlighttext="Freude" fontsize="text-md" />
            </button>

            {/* feelings family: Entspannung */}
            <button
              className="flex flex-col items-center row-span-2 col-span-3 justify-center pl-7"
              onClick={() => handleLoadStatisticsOne(feelingsFamilies[2].id)}
            >
              <IlluEntspannung className="flex-shrink-0" />
              <HighlightText highlighttext="Entspannung" fontsize="text-md" />
            </button>

            {/* feelings family: gemischte Gefühle */}
            <button
              className="items-start justify-start col-span-2 row-span-2 pb-10"
              onClick={() => handleLoadStatisticsOne(feelingsFamilies[4].id)}
            >
              <div className="flex flex-col items-center">
                <IlluGemischteGefühle className="flex-shrink-0" />
                <HighlightText
                  highlighttext="gemischte Gefühle"
                  fontsize="text-md"
                />
              </div>
            </button>

            {/* feelings family: Trauer */}
            <button
              className="flex flex-col items-center  justify-end row-span-2"
              onClick={() => handleLoadStatisticsOne(feelingsFamilies[3].id)}
            >
              <IlluTrauer className="flex-shrink-0" />
              <HighlightText highlighttext="Trauer" fontsize="text-md" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectFeelingsFamily;
