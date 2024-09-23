import { useMetricsContext } from "@/utils/MetricsProvider";
import { useEffect } from "react";
import MetricsRadialChart from "../../../usedDemoComponents/MetricsRadialChart";
import UserFeedbackText from "/src/components/typo/UserFeedbackText";

const StatisticTwo = () => {
  const {
    showMetricsTwo,
    selectedTag,
    setSelectTag,
    statisticsByTag,
    disableTag,
    setDisableTag,
    setMetricsTwoStatus,
    fetchStatsByTag,
  } = useMetricsContext();

  // TODO: info, dass nur eine Option auswählbar

  useEffect(() => {
    fetchStatsByTag(selectedTag.name);
  }, []);

  // NOTICE: vielleicht in MetricsProvider auslagern - wird auch in StatisticTwo benötigt
  const caluclatePercentageAndEndAngle = (totalCount, singleCount) => {
    const valuePercentage = (
      (singleCount / totalCount).toFixed(10) * 100
    ).toFixed(0);
    const ValueEndAngle =
      ((singleCount / totalCount).toFixed(10) * 100).toFixed(0) * 3.6;

    return { valuePercentage, ValueEndAngle };
  };

  // check if statisticsByTag available
  if (!statisticsByTag || !statisticsByTag.stats) {
    return (
      <UserFeedbackText
        type="info"
        content="Statistiken sind momentan nicht verfügbar"
      />
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* selected tag */}
      <p
        className="bg-black text-white font-bold px-2 py-2 my-5"
        style={{
          clipPath: "polygon(0% 15%, 97% 0%, 100% 85%, 3% 100%)",
          // oben links, oben rechts, unten rechts, unten links
        }}
      >
        {selectedTag.name}
      </p>

      {/* dash */}
      <div className="h-1 w-[300px] bg-background rounded-full mb-5"></div>

      {/* statistics by tag */}
      {statisticsByTag.stats.length === 0 ? (
        <UserFeedbackText
          type="info"
          content="Zu dieser Option sind noch keine Einträge vorhanden."
        />
      ) : (
        <div>
          <ul className="flex flex-row flex-wrap justify-evenly">
            {statisticsByTag.stats.map((stat) => {
              const { valuePercentage, ValueEndAngle } =
                caluclatePercentageAndEndAngle(
                  statisticsByTag.total,
                  stat.count
                );

              return (
                <li key={stat.name}>
                  {/* vllt. besseren key finden */}
                  {/* TODO: hinzufügen (dynamisch) von icons für die einzelnen gefühle */}
                  <div className="flex flex-row justify-evenly py-2">
                    <MetricsRadialChart
                      checkIns={`${stat.count} von ${statisticsByTag.total}`}
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
      )}
    </div>
  );
};

export default StatisticTwo;
