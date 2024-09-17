import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useMetricsContext } from "@/utils/MetricsProvider";
import SelectFeelingsInStatisticOne from "./SelectFeelingsInStatisticOne";
// import MetricsRadialChart from "@/components/usedDemoComponents/MetricsRadialChart";
import MetricsRadialChart from "../../../usedDemoComponents/MetricsRadialChart";

const StatisticOne = () => {
  const { feelingsFamilies } = useEmotionsContext();
  const {
    selectedFeelingsFamily,
    setSelectedFeelingsFamily,
    statisticsByFamily,
  } = useMetricsContext();

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

  // TODO: fakeDateStatsisticOne durch statisticsByFalimy ersetzten:
  // NOTICE: checkIns werden zu stats
  // NOTICE: category fehlt in fetch!
  console.log({ statisticsByFamily });

  // NOTICE: vielleicht in MetricsProvider auslagenr - wird auch in StatisticTwo benötigt
  const caluclatePercentageAndEndAngle = (totalCount, singleCount) => {
    const valuePercentage = (
      (singleCount / totalCount).toFixed(10) * 100
    ).toFixed(0);
    const ValueEndAngle =
      ((singleCount / totalCount).toFixed(10) * 100).toFixed(0) * 3.6;

    return { valuePercentage, ValueEndAngle };
  };

  return (
    <div className="flex flex-col items-center">
      <SelectFeelingsInStatisticOne />
      <div className="h-1 w-[300px] bg-background rounded-full "></div>

      {/* Statistics */}
      <div className="overflow-auto max-h-[350px]">
        {/* Zeitpunkt */}
        <div>
          <p className="text-start mx-5 mt-5 px-1 w-fit text-md bg-selected-subemotion">
            Zeitpunkt:
          </p>
          {/* TODO: auswahl Gefühl mit Anzeige verbinden */}

          <ul className="flex flex-row  flex-wrap justify-evenly">
            {/* map through all checkin-values and display statistic: */}
            {fakeDataStatsticOne[0].checkIns
              .filter(
                (feelingsfamily) => feelingsfamily.category === "Zeitpunkt"
              )
              .map((checkIn) => {
                const { valuePercentage, ValueEndAngle } =
                  caluclatePercentageAndEndAngle(
                    fakeDataStatsticOne[0].total,
                    checkIn.count
                  );
                return (
                  <li>
                    <div className="flex flex-row justify-evenly py-2">
                      <MetricsRadialChart
                        checkIns={`${checkIn.count} von ${fakeDataStatsticOne[0].total}`}
                        chartTitle={checkIn.name}
                        endAngle={
                          ValueEndAngle
                          // (
                          //   (
                          //     `${checkIn.count}` /
                          //     `${fakeDataStatsticOne[0].total}`
                          //   ).toFixed(10) * 100
                          // ).toFixed(0) * 3.6
                        }
                        percentage={
                          valuePercentage
                          //   (
                          //   (
                          //     `${checkIn.count}` /
                          //     `${fakeDataStatsticOne[0].total}`
                          //   ).toFixed(10) * 100
                          // ).toFixed(0)
                        }
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Ort */}
        <div>
          <p className="text-start mt-5 mx-5 px-1 w-fit text-md bg-selected-subemotion">
            Ort:
          </p>
          <ul className="flex flex-row flex-wrap justify-evenly">
            {/* map through all checkin-values and display statistic: */}
            {fakeDataStatsticOne[0].checkIns
              .filter((feelingsfamily) => feelingsfamily.category === "Ort")
              .map((checkIn) => {
                const { valuePercentage, ValueEndAngle } =
                  caluclatePercentageAndEndAngle(
                    fakeDataStatsticOne[0].total,
                    checkIn.count
                  );
                return (
                  <li>
                    <div className="flex flex-row justify-evenly py-2">
                      <MetricsRadialChart
                        checkIns={`${checkIn.count} von ${fakeDataStatsticOne[0].total}`}
                        chartTitle={checkIn.name}
                        endAngle={ValueEndAngle}
                        percentage={valuePercentage}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Mit wem */}
        <div>
          <p className="text-start mt-5 mx-5 px-1 w-fit text-md bg-selected-subemotion">
            Mit wem:
          </p>
          <ul className="flex flex-row  flex-wrap justify-evenly">
            {/* map through all checkin-values and display statistic: */}
            {fakeDataStatsticOne[0].checkIns
              .filter((feelingsfamily) => feelingsfamily.category === "Mit wem")
              .map((checkIn) => {
                const { valuePercentage, ValueEndAngle } =
                  caluclatePercentageAndEndAngle(
                    fakeDataStatsticOne[0].total,
                    checkIn.count
                  );
                return (
                  <li>
                    <div className="flex flex-row justify-evenly py-2">
                      <MetricsRadialChart
                        checkIns={`${checkIn.count} von ${fakeDataStatsticOne[0].total}`}
                        chartTitle={checkIn.name}
                        endAngle={ValueEndAngle}
                        percentage={valuePercentage}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Kontext */}
        <div className="w-[300px] max-h-[350px]">
          <p className="text-start mt-5 mx-5 px-1 w-fit text-md bg-selected-subemotion">
            Kontext:
          </p>
          <ul className="flex flex-row flex-wrap justify-evenly">
            {/* map through all checkin-values and display statistic: */}
            {fakeDataStatsticOne[0].checkIns
              .filter((feelingsfamily) => feelingsfamily.category === "Kontext")
              .map((checkIn) => {
                const { valuePercentage, ValueEndAngle } =
                  caluclatePercentageAndEndAngle(
                    fakeDataStatsticOne[0].total,
                    checkIn.count
                  );
                return (
                  <li>
                    <div className="flex flex-row justify-evenly py-2">
                      <MetricsRadialChart
                        checkIns={`${checkIn.count} von ${fakeDataStatsticOne[0].total}`}
                        chartTitle={checkIn.name}
                        endAngle={ValueEndAngle}
                        percentage={valuePercentage}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatisticOne;
