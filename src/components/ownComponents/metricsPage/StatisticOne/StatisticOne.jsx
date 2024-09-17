import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useMetricsContext } from "@/utils/MetricsProvider";
import SelectFeelingsInStatisticOne from "./SelectFeelingsInStatisticOne";
import MetricsOneRadialChart from "@/components/usedDemoComponents/MetricsOneRadialChart";

const StatisticOne = () => {
  const { feelingsFamilies } = useEmotionsContext();
  const { selectedFeelingsFamily, setSelectedFeelingsFamily, statisticsByFamily } =
    useMetricsContext();

  // console.log({ feelingsFamilies });
  // console.log({ selectedFeelingsFamily });

  // from provider - now fakedata:
  const fakeDataStatsticOne = [
    {
      family: "Freude",
      checkIns: [
        { name: "Vormittag", count: 7, category: "Zeitpunkt" },
        { name: "Mittag", count: 1, category: "Zeitpunkt" },
        { name: "Arbeit", count: 2, category: "Ort" },
        { name: "Wald", count: 1, category: "Ort" },
        { name: "daheim", count: 2, category: "Ort" },
        { name: "alleine", count: 1, category: "Mit wem" },
        { name: "Projekt", count: 2, category: "Kontext" },
        { name: "Meditation", count: 1, category: "Kontext" },
      ],
      total: 7,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <SelectFeelingsInStatisticOne />
      <div className="h-1 w-[300px] bg-background rounded-full "></div>

      {/* Statistics */}
      <div className="overflow-auto max-h-[350px]">
        {/* Zeitpunkt */}
        <div>
          <p className="text-start mt-5 px-1 w-fit text-md bg-selected-subemotion">
            Zeitpunkt:
          </p>
          {/* TODO: auswahl Gefühl mit Anzeige verbinden */}
          <ul>
            {/* map through all checkin-values and display statistic: */}
            {fakeDataStatsticOne[0].checkIns
              .filter(
                (feelingsfamily) => feelingsfamily.category === "Zeitpunkt"
              )
              .map((checkIn) => (
                <li>
                  <div className="flex flex-row justify-evenly py-2">
                    <MetricsOneRadialChart
                      checkIns={`${checkIn.count} von ${fakeDataStatsticOne[0].total}`}
                      chartTitle={checkIn.name}
                      endAngle={118} // hier muss dynamischer Wert berechnet werden => 360 = 100%
                      percentage={(
                        (
                          `${checkIn.count}` / `${fakeDataStatsticOne[0].total}`
                        ).toFixed(10) * 100
                      ).toFixed(0)}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Ort */}
        <div>
          <p className="text-start mt-5 px-1 w-fit text-md bg-selected-subemotion">
            Ort:
          </p>
          {/* TODO: MetricsOneRadialChart dynamisch machen und dann hier mit map für jeden erfassten Zeitpunkt komponente rendern */}
          <ul>
            {/* map through all checkin-values and display statistic: */}
            {fakeDataStatsticOne[0].checkIns
              .filter((feelingsfamily) => feelingsfamily.category === "Ort")
              .map((checkIn) => (
                <li>
                  <div className="flex flex-row justify-evenly py-2">
                    <MetricsOneRadialChart
                      checkIns={`${checkIn.count} von ${fakeDataStatsticOne[0].total}`}
                      chartTitle={checkIn.name}
                      endAngle={118} // hier muss dynamischer Wert berechnet werden => 360 = 100%
                      percentage={(
                        (
                          `${checkIn.count}` / `${fakeDataStatsticOne[0].total}`
                        ).toFixed(10) * 100
                      ).toFixed(0)}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Mit wem */}
        <div>
          <p className="text-start mt-5 px-1 w-fit text-md bg-selected-subemotion">
            Mit wem:
          </p>
          {/* TODO: MetricsOneRadialChart dynamisch machen und dann hier mit map für jeden erfassten Zeitpunkt komponente rendern */}
          <ul>
            {/* map through all checkin-values and display statistic: */}
            {fakeDataStatsticOne[0].checkIns
              .filter((feelingsfamily) => feelingsfamily.category === "Mit wem")
              .map((checkIn) => (
                <li>
                  <div className="flex flex-row justify-evenly py-2">
                    <MetricsOneRadialChart
                      checkIns={`${checkIn.count} von ${fakeDataStatsticOne[0].total}`}
                      chartTitle={checkIn.name}
                      endAngle={118} // hier muss dynamischer Wert berechnet werden => 360 = 100%
                      percentage={(
                        (
                          `${checkIn.count}` / `${fakeDataStatsticOne[0].total}`
                        ).toFixed(10) * 100
                      ).toFixed(0)}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Kontext */}
        <div className="w-[300px] max-h-[350px]">
          <p className="text-start mt-5 px-1 w-fit text-md bg-selected-subemotion">
            Kontext:
          </p>
          {/* TODO: MetricsOneRadialChart dynamisch machen und dann hier mit map für jeden erfassten Zeitpunkt komponente rendern */}
          <ul>
            {/* map through all checkin-values and display statistic: */}
            {fakeDataStatsticOne[0].checkIns
              .filter((feelingsfamily) => feelingsfamily.category === "Kontext")
              .map((checkIn) => (
                <li>
                  <div className="flex flex-row justify-evenly py-2">
                    <MetricsOneRadialChart
                      checkIns={`${checkIn.count} von ${fakeDataStatsticOne[0].total}`}
                      chartTitle={checkIn.name}
                      endAngle={118} // hier muss dynamischer Wert berechnet werden => 360 = 100%
                      percentage={(
                        (
                          `${checkIn.count}` / `${fakeDataStatsticOne[0].total}`
                        ).toFixed(10) * 100
                      ).toFixed(0)}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatisticOne;
