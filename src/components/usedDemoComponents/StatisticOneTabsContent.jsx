import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import SelectFeelingsFamily from "../ownComponents/metricsPage/StatisticOne/SelectFeelingsFamily";
import StatisticOne from "../ownComponents/metricsPage/StatisticOne/StatisticOne";

// import EmotionsProvider:
// import { useEmotionsContext } from "@/utils/EmotionsProvider";

import { useMetricsContext } from "@/utils/MetricsProvider";
import MessageCheckInsM1 from "../ownComponents/metricsPage/StatisticOne/MessageCheckInsM1";

const StatisticOneTabsContent = () => {
  // import from useEmotionsContext:
  // const { feelingsFamilies } = useEmotionsContext();

  const {
    metricsOneStatus,
    setMetricsOneStatus,
    maxMetricsOneStatus,
    checkIn,
    setCheckIn,
    showMetrics,
    setShowMetrics,
  } = useMetricsContext();



  const renderMetricsOne = () => {
    switch (metricsOneStatus) {
      case 1:
        return <SelectFeelingsFamily />;
      case 2:
        return <StatisticOne />;
      default:
        return <SelectFeelingsFamily />;
    }
  };

  return (
    <TabsContent value="account">
      <Card className="max-w-[350px]">
        {/* <StatisticOneCardHeader /> */}
        {!showMetrics && (
          <CardHeader>
            <MessageCheckInsM1 />
          </CardHeader>
        )}

        <CardContent className="space-y-2">
          {/* component für auswahl gefühlsfamilie */}
          {/* component  für Anzeige Statistik*/}
          {renderMetricsOne()}
        </CardContent>
        {/* CardFooter brauchen wir wahrscheinlich nicht */}
        {/* <CardFooter></CardFooter> */}
      </Card>
    </TabsContent>
  );
};

export default StatisticOneTabsContent;
