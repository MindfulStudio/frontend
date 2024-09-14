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
import MessageCheckInsM1 from "../ownComponents/metricsPage/StatisticOne/MessageCheckInsM1";
import MessageMetricsM1 from "../ownComponents/metricsPage/StatisticOne/MessageMetricsM1";
import { useEffect, useState } from "react";
import SelectFeelingsFamily from "../ownComponents/metricsPage/StatisticOne/SelectFeelingsFamily";
import StatisticOne from "../ownComponents/metricsPage/StatisticOne/StatisticOne";

// import EmotionsProvider:
// import { useEmotionsContext } from "@/utils/EmotionsProvider";

const StatisticOneTabsContent = () => {
  // import from useEmotionsContext:
  // const { feelingsFamilies } = useEmotionsContext();

  // useState für Anzahl check-ins des Tages:
  const [checkIn, setCheckIn] = useState(7); // fake-State zum testen
  //  getAllCheckIns
  // Funktion/State zur Überprüfung, ob mehr als 7 check-ins vorhanden sind - CardDescription & CardContent wird entschrechend eingblendet
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    if (Number(checkIn) >= 7) {
      setShowMetrics(true);
    }
  }, []);

  // State in den Auswahl der Gefühlsfamilie gespeichert wird ?
  // Gefühlsfamilie ist Button -> bei onClick wird zu component mit statistik weitergeleitet

  // in component mit Statistik
  // getStatisticsByFamily
  const [metricsOneStatus, setMetricsOneStatus] = useState(1);
  const maxMetricsOneStatus = 2;


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
        <CardHeader>
          {/* <CardTitle>Statistic One</CardTitle> */}

          {/* CardDescription: */}
          {showMetrics ? <MessageMetricsM1 /> : <MessageCheckInsM1 />}
        </CardHeader>
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
