import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticOneTabsContent from "./StatisticOneTabsContent";
import StatisticTwoTabsContent from "./StatisticTwoTabsContent";
import ArrowLeftIcon from "/src/assets/icons/arrow-left-svgrepo-com.svg";

import { useMetricsContext } from "@/utils/MetricsProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function MetricsPageTabs() {
  const { metricsOneStatus, previousMetricsOneStep } = useMetricsContext();

  const [showArrow, setShowArrow] = useState(false);

  // navigate back:
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    if (metricsOneStatus > 1) {
      previousMetricsOneStep();
    } else {
      navigate("/dashboard");
    }
  };

  // show/hide arrow:
  useEffect(() => {
    if (metricsOneStatus > 1) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  }, [metricsOneStatus]);

  return (
    <main>
      {showArrow && (
        <button onClick={handleNavigateBack}>
          <ArrowLeftIcon className="absolute top-1/2 left-8" />
        </button>
      )}

      <Tabs defaultValue="account" className="max-w-[350px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Statistic One</TabsTrigger>
          <TabsTrigger value="password">Statistic Two</TabsTrigger>
        </TabsList>

        {/* statistic ONE */}
        <StatisticOneTabsContent />

        {/* statistic TWO */}
        <StatisticTwoTabsContent />
      </Tabs>
    </main>
  );
}
