import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import MessageCheckInsM2 from "../ownComponents/metricsPage/StatisticTwo/MessageCheckInsM2";
import MessageMetricsM2 from "../ownComponents/metricsPage/StatisticTwo/MessageMetricsM2";
import { useEffect, useState } from "react";
import { useMetricsContext } from "../../utils/MetricsProvider.jsx";
import SelectTag from "../ownComponents/metricsPage/StatisticTwo/SelectTag";

import StatisticTwo from "../ownComponents/metricsPage/StatisticTwo/StatisticTwo.jsx";

const StatisticTwoTabsContent = () => {
  const {
    loadStatisticsByTag,
    showMetricsTwo,
    maxMetricsTwoStatus,
    metricsTwoStatus,
    setMetricsTwoStatus,
  } = useMetricsContext();

  const renderMetricsTwo = () => {
    switch (metricsTwoStatus) {
      case 1:
        return <SelectTag />;
      case 2:
        return <StatisticTwo />;
      default:
        return <SelectTag />;
    }
  };

  return (
    <TabsContent value="password">
      <Card className="max-w-[350px]">
        {/* CardDescription: */}
        {!showMetricsTwo && (
          <CardHeader>
            <MessageCheckInsM2 />
          </CardHeader>
        )}

        <CardContent className="space-y-2">
          {/* component für auswahl tag */}
          {/* component  für Anzeige Statistik*/}
          {renderMetricsTwo()}
        </CardContent>
        {/* CardFooter brauchen wir wahrscheinlich nicht */}
        {/* <CardFooter><Button>Save password</Button></CardFooter> */}
      </Card>
    </TabsContent>
  );
};

export default StatisticTwoTabsContent;
