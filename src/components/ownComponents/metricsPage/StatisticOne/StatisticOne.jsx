import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useMetricsContext } from "@/utils/MetricsProvider";
import SelectFeelingsInStatisticOne from "./SelectFeelingsInStatisticOne";
// import MetricsRadialChart from "@/components/usedDemoComponents/MetricsRadialChart";
import MetricsRadialChart from "../../../usedDemoComponents/MetricsRadialChart";
import UserFeedbackText from "/src/components/typo/UserFeedbackText";

const StatisticOne = () => {
  const { feelingsFamilies } = useEmotionsContext();
  const {
    selectedFeelingsFamily,
    setSelectedFeelingsFamily,
    statisticsByFamily,
  } = useMetricsContext();

  console.log({ statisticsByFamily });

  // check if statisticsByFamily available
  if (!statisticsByFamily || !statisticsByFamily.stats) {
    return (
      <UserFeedbackText
        type="info"
        content="Statistiken sind momentan nicht verfügbar"
      />
    );
  }

  // NOTICE: vielleicht in MetricsProvider auslagern - wird auch in StatisticTwo benötigt
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

      {/* dash */}
      <div className="h-1 w-[300px] bg-background rounded-full mb-5"></div>

      {statisticsByFamily.stats.filter((stat) => stat.category === "wann")
        .length === 0 ? (
        <UserFeedbackText
          type="info"
          content="Zu dieser Gefühlsfamilie sind noch keine Einträge vorhanden."
        />
      ) : (
        <div className="overflow-auto max-h-[350px]">
          {/* Zeitpunkt */}
          <div>
            <p className="text-start mx-5 px-1 w-fit text-md bg-selected-subemotion">
              Zeitpunkt:
            </p>

            <ul className="flex flex-row  flex-wrap justify-evenly">
              {/* map through all checkin-values and display statistic: */}
              {statisticsByFamily.stats
                .filter((stat) => stat.category === "wann")
                .map((stat) => {
                  const { valuePercentage, ValueEndAngle } =
                    caluclatePercentageAndEndAngle(
                      statisticsByFamily.checkinsTotal,
                      stat.count
                    );

                  return (
                    <li key={stat.name}>
                      {/* vllt. noch besseren key finden */}
                      <div className="flex flex-row justify-evenly py-2">
                        <MetricsRadialChart
                          checkIns={`${stat.count} von ${statisticsByFamily.checkinsTotal}`}
                          chartTitle={stat.name}
                          endAngle={ValueEndAngle}
                          percentage={valuePercentage}
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
              {statisticsByFamily.stats
                .filter((stat) => stat.category === "wo")
                .map((stat) => {
                  const { valuePercentage, ValueEndAngle } =
                    caluclatePercentageAndEndAngle(
                      statisticsByFamily.checkinsTotal,
                      stat.count
                    );
                  return (
                    <li>
                      <div className="flex flex-row justify-evenly py-2">
                        <MetricsRadialChart
                          checkIns={`${stat.count} von ${statisticsByFamily.checkinsTotal}`}
                          chartTitle={stat.name}
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
              {statisticsByFamily.stats
                .filter((stat) => stat.category === "mitWem")
                .map((stat) => {
                  const { valuePercentage, ValueEndAngle } =
                    caluclatePercentageAndEndAngle(
                      statisticsByFamily.checkinsTotal,
                      stat.count
                    );
                  return (
                    <li>
                      <div className="flex flex-row justify-evenly py-2">
                        <MetricsRadialChart
                          checkIns={`${stat.count} von ${statisticsByFamily.checkinsTotal}`}
                          chartTitle={stat.name}
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
              {statisticsByFamily.stats
                .filter((stat) => stat.category === "was")
                .map((stat) => {
                  const { valuePercentage, ValueEndAngle } =
                    caluclatePercentageAndEndAngle(
                      statisticsByFamily.checkinsTotal,
                      stat.count
                    );
                  return (
                    <li>
                      <div className="flex flex-row justify-evenly py-2">
                        <MetricsRadialChart
                          checkIns={`${stat.count} von ${statisticsByFamily.checkinsTotal}`}
                          chartTitle={stat.name}
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
      )}
    </div>
  );
};

export default StatisticOne;
