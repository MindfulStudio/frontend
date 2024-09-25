// ------------------------------- importing components, hooks and context -------------------------------
// components:
import { MetricsPageTabs } from "@/components/usedDemoComponents/MetricsPageTabs";
import ArrowLeftIcon from "/src/assets/icons/arrow-left-svgrepo-com.svg";
// hooks:
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// context:
import { useMetricsContext } from "@/utils/MetricsProvider";

// ------------------------------- Metrics Page Component -------------------------------
// Main component for displaying metrics and handling navigation
const MetricsPage = () => {
  // destructure values and functions from MetricsContext
  const {
    metricsOneStatus,
    metricsTwoStatus,
    previousMetricsOneStep,
    getAllCheckins,
    showArrow,
    setShowArrow,
    setMetricsTwoStatus,
    setMetricsOneStatus,
    previousMetricsTwoStep,
  } = useMetricsContext();
  // ------------------------------- Navigation Logic -------------------------------

  // handle back navigation depending on metrics statuses
  // if metricsOneStatus or MetricsTwoStatus it greater than 1, go back one step,
  // otherwise navigate back to the dashboard
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

  // NOTICE: refactor logic for handling MetricsOneStatus and MetricsTwoStatus => maybe creating shard function or custom hook?
  // NOTICE: maybe refacort arrow-related logic into own components?
  // ------------------------------- Metrics One useEffect -------------------------------
  // fetch all check-ins and adjust visibility of the arrow based on metricsOneStatus
  // if metricsOneStatus >1, show the arrow, otherwise hide it and reset metriceOneStatus to 1
  useEffect(() => {
    getAllCheckins();
    if (metricsOneStatus > 1) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
      setMetricsOneStatus(1);
    }
  }, [metricsOneStatus]);

  // ------------------------------- Metrics Two useEffect -------------------------------
  // similiar as logic for metrics one, but applied to metricsTwoStatus
  // show or hide the arrow based in metricsTwoStatus and reset the value if needed
  useEffect(() => {
    getAllCheckins();
    if (metricsTwoStatus > 1) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
      setMetricsTwoStatus(1);
    }
  }, [metricsTwoStatus]);

  // ------------------------------- Return JSX -------------------------------
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
