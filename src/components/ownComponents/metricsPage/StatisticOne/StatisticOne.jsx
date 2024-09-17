import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useMetricsContext } from "@/utils/MetricsProvider";
import SelectFeelingsInStatisticOne from "./SelectFeelingsInStatisticOne";
import MetricsOneRadialChart from "@/components/usedDemoComponents/MetricsOneRadialChart";

const StatisticOne = () => {
  const { feelingsFamilies } = useEmotionsContext();
  const { selectedFeelingsFamily, setSelectedFeelingsFamily } =
    useMetricsContext();
  const { statisticsByFamily } = useMetricsContext();

  return (
    <div className="flex flex-col items-center">
      <SelectFeelingsInStatisticOne />
      <div className="h-1 w-[300px] bg-background rounded-full "></div>

      {/* Statistics */}
      {/* NOTICE: auslagern? */}
      <div className="overflow-auto max-h-[350px]">
        {/* Zeitpunkt */}
        <div>
          <p className="w-[300px] text-start pt-5 max-h-[350px] text-md">
            Zeitpunkt:
          </p>
          {/* TODO: MetricsOneRadialChart dynamisch machen und dann hier mit map für jeden erfassten Zeitpunkt komponente rendern */}
          <div className="flex flex-row justify-evenly py-2">
            <MetricsOneRadialChart
              checkIns={"1 von 3"}
              chartTitle={"Vormittag"}
              endAngle={118} // hier muss dynamischer Wert berechnet werden => 360 = 100%
              percentage={30}
            />
          </div>
        </div>

        {/* Ort */}
        <div>
          <p className="w-[300px] text-start pt-5 max-h-[350px] text-md">
            Ort:
          </p>
          {/* TODO: MetricsOneRadialChart dynamisch machen und dann hier mit map für jeden erfassten Zeitpunkt komponente rendern */}
          <div className="flex flex-row justify-evenly py-2">
            <MetricsOneRadialChart
              checkIns={"1 von 3"}
              chartTitle={"Vormittag"}
              endAngle={118} // hier muss dynamischer Wert berechnet werden => 360 = 100%
              percentage={30}
            />
          </div>
        </div>

        {/* Mit wem */}
        <div>
          <p className="w-[300px] text-start pt-5 max-h-[350px] text-md">
            Mit wem:
          </p>
          {/* TODO: MetricsOneRadialChart dynamisch machen und dann hier mit map für jeden erfassten Zeitpunkt komponente rendern */}
          <div className="flex flex-row justify-evenly py-2">
            <MetricsOneRadialChart
              checkIns={"1 von 3"}
              chartTitle={"Vormittag"}
              endAngle={118} // hier muss dynamischer Wert berechnet werden => 360 = 100%
              percentage={30}
            />
          </div>
        </div>

        {/* Kontext */}
        <div>
          <p className="w-[300px] text-start pt-5 max-h-[350px] text-md">
            Kontext:
          </p>
          {/* TODO: MetricsOneRadialChart dynamisch machen und dann hier mit map für jeden erfassten Zeitpunkt komponente rendern */}
          <div className="flex flex-row justify-evenly py-2">
            <MetricsOneRadialChart
              checkIns={"1 von 3"}
              chartTitle={"Vormittag"}
              endAngle={118} // hier muss dynamischer Wert berechnet werden => 360 = 100%
              percentage={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticOne;
