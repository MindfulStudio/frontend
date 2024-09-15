import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useMetricsContext } from "@/utils/MetricsProvider";
import SelectFeelingsInStatisticOne from "./SelectFeelingsInStatisticOne";
import MetricsOneRadialChart from "@/components/usedDemoComponents/MetricsOneRadialChart";

const StatisticOne = () => {
  // import from EmotionsContext:
  const { feelingsFamilies } = useEmotionsContext();
  // import from mreticsContext:
  const { selectedFeelingsFamily, setSelectedFeelingsFamily } =
    useMetricsContext();

  console.log({ feelingsFamilies });
  console.log({ selectedFeelingsFamily });
  return (
    <div className="flex flex-col items-center">
      <SelectFeelingsInStatisticOne />
      <div className="h-1 w-[300px] bg-background rounded-full"></div>
      <div>
        <p className="w-[300px] text-start pt-5 max-h-[350px]">Zeitpunkt:</p>
        <MetricsOneRadialChart/>
      </div>
    </div>
  );
};

export default StatisticOne;
