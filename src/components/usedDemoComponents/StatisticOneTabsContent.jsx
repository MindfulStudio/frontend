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

const StatisticOneTabsContent = () => {
  // useState für Anzahl check-ins des Tages:
  const [checkIn, setCheckIn] = useState(null); // fake-State zum testen
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

  return (
    <TabsContent value="account">
      <Card>
        <CardHeader>
          {/* <CardTitle>Statistic One</CardTitle> */}

          {/* CardDescription: */}
          {showMetrics ? <MessageMetricsM1 /> : <MessageCheckInsM1 />}
        </CardHeader>
        <CardContent className="space-y-2">
          {/* component für auswahl gefühlsfamilie */}

          {/* component  für Anzeige Statistik*/}
        </CardContent>
        {/* CardFooter brauchen wir wahrscheinlich nicht */}
        {/* <CardFooter></CardFooter> */}
      </Card>
    </TabsContent>
  );
};

export default StatisticOneTabsContent;
