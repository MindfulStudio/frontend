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

const StatisticTwoTabsContent = () => {
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

  return (
    <TabsContent value="password">
      <Card>
        <CardHeader>
          {/* <CardTitle>Statistic Two</CardTitle> */}

          {/* CardDescription: */}
          {showMetrics ? <MessageMetricsM2 /> : <MessageCheckInsM2 />}
        </CardHeader>
        <CardContent className="space-y-2">
          {/* component für auswahl tag */}

          {/* component  für Anzeige Statistik*/}
        </CardContent>
        {/* CardFooter brauchen wir wahrscheinlich nicht */}
        {/* <CardFooter><Button>Save password</Button></CardFooter> */}
      </Card>
    </TabsContent>
  );
};

export default StatisticTwoTabsContent;
