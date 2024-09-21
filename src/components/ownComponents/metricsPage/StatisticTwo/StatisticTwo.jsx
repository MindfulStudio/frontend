import { useMetricsContext } from "@/utils/MetricsProvider";
import { useEffect } from "react";

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

  useEffect(() => {
    fetchStatsByTag("morgens");
    // TODO: insert a state variable from MetricsProvider here as a parameter (instead of "morgens")
  }, []);
  return (
    <div>
      {selectedTag.name}
    </div>
  );
};

export default StatisticTwo;
