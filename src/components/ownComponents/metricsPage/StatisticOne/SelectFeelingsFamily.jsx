import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";

// import EmotionsProvider:
import { useEmotionsContext } from "@/utils/EmotionsProvider";
// import metricsContext
import { useMetricsContext } from "@/utils/MetricsProvider";
import { CardHeader } from "@/components/ui/card";
import MessageMetricsM1 from "./MessageMetricsM1";

const SelectFeelingsFamily = () => {
  // import from useEmotionsContext:
  const { feelingsFamilies } = useEmotionsContext();
  // import from useMetricsContext:
  const {
    showMetrics,
    metricsOneStatus,
    setMetricsOneStatus,
    maxMetricsOneStatus,
    selectedFeelingsFamily,
    setSelectedFeelingsFamily,
  } = useMetricsContext();

  // const [selectedFeelingsFamily, setSelectedFeelingsFamily] = useState(null);

  // selecting family and loading statisticsOne-page
  const handleLoadStatisticsOne = (familyId) => {
    try {
      // setMetricsOneStatus => load StatisticOneComponent
      if (metricsOneStatus <= maxMetricsOneStatus) {
        setMetricsOneStatus((prevStat) => prevStat + 1);
      }

      // save selected familyId:
      setSelectedFeelingsFamily(familyId);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  // console.log({ selectedFeelingsFamily });
  // console.log({ metricsOneStatus });

  return (
    <div>
      {showMetrics && (
        <div>
          <CardHeader>
            <MessageMetricsM1 />
          </CardHeader>
          <div className="mt-5 grid grid-cols-3 grid-rows-6 ">
            {/* Anspannung */}
            <button
              className="flex flex-col items-start row-span-2 col-span-2 justify-end"
              onClick={() => handleLoadStatisticsOne(feelingsFamilies[0].id)}
            >
              <div className="flex flex-col items-center">
                <IlluAnspannung className="flex-shrink-0" />
                <HighlightText highlighttext="Anspannung" fontsize="text-md" />
              </div>
            </button>
            {/* Freude */}
            <button
              className="flex flex-col items-center row-span-2 justify-start"
              onClick={() => handleLoadStatisticsOne(feelingsFamilies[1].id)}
            >
              <IlluFreude className="flex-shrink-0" />
              <HighlightText highlighttext="Freude" fontsize="text-md" />
            </button>

            {/* Entspannung */}
            <button
              className="flex flex-col items-center row-span-2 col-span-3 justify-center pl-7"
              onClick={() => handleLoadStatisticsOne(feelingsFamilies[2].id)}
            >
              <IlluEntspannung className="flex-shrink-0" />
              <HighlightText highlighttext="Entspannung" fontsize="text-md" />
            </button>

            {/* gemischte Gefühle */}
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

            {/* Trauer */}
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