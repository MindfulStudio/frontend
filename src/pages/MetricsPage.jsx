import { MetricsPageTabs } from "@/components/usedDemoComponents/MetricsPageTabs";
import { useNavigate } from "react-router-dom";
import { useMetricsContext } from "@/utils/MetricsProvider";
import { useEffect } from "react";
import ArrowLeftIcon from "/src/assets/icons/arrow-left-svgrepo-com.svg";

const MetricsPage = () => {
  const {
    metricsOneStatus,
    metricsTwoStatus,
    previousMetricsOneStep,
    getAllCheckins,
    showArrow,
    setShowArrow,
    setSelectedTag,
    setMetricsTwoStatus,
    setMetricsOneStatus,
    previousMetricsTwoStep,
  } = useMetricsContext();

  // navigate back:
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    if (metricsOneStatus > 1) {
      previousMetricsOneStep();
      setShowArrow(true);
    } else if (metricsTwoStatus > 1) {
      previousMetricsTwoStep();
      setShowArrow(true);
    } else {
      navigate("/dashboard");
    }
  };

  // show/hide arrow:
  // statisticOne

  useEffect(() => {
    getAllCheckins();
    if (metricsOneStatus > 1) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
      setMetricsOneStatus(1);
    }
  }, [metricsOneStatus]);

  // statisticTwo
  useEffect(() => {
    getAllCheckins();
    if (metricsTwoStatus > 1) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
      setMetricsTwoStatus(1);
    }
  }, [metricsTwoStatus]);


  return (
    <main className="flex flex-col items-center w-full h-screen pt-[109px]">
      {showArrow && (
        <button
          onClick={handleNavigateBack}
          className="absolute left-[calc((100vw-350px)/4)] top-1/2 transform -translate-y-1/2 -translate-x-1/2"
        >
          <ArrowLeftIcon className="rounded-full bg-gray-200 hover:bg-gray-300" />
        </button>
      )}
      <MetricsPageTabs />
    </main>
  );
};

export default MetricsPage;
