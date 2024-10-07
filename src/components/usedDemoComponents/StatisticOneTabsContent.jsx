// ------------------------------- importing components and context -------------------------------
// components:
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import SelectFeelingsFamily from "../ownComponents/metricsPage/StatisticOne/SelectFeelingsFamily";
import StatisticOne from "../ownComponents/metricsPage/StatisticOne/StatisticOne";
import MessageCheckInsM1 from "../ownComponents/metricsPage/StatisticOne/MessageCheckInsM1";
// context providers:
import { useMetricsContext } from "../../utils/contexts/MetricsProvider";

// ------------------------------- MetricsPageTabs Component -------------------------------
// this components handles the content ot the StatisticOne-tab
// it displays either a selection for feelings family or the actual statistics, depending on the state (metricsOneStatus)
const StatisticOneTabsContent = () => {
  // destructure values from MetricsContext
  const {
    metricsOneStatus, // tracks current status of metricsOne - used to switch between components
    showMetricsOne, // boolean to determine if the metrics content should be displayed
  } = useMetricsContext();

  // NOTICE: maybe refactore logic renderMetricsOne?
  // ------------------------------- Function rendering components -------------------------------
  // logic to render different components based on current metricsOneStatus
  const renderMetricsOne = () => {
    switch (metricsOneStatus) {
      case 1:
        return <SelectFeelingsFamily />; // step 1: shows feelings family selection
      case 2:
        return <StatisticOne />; // step 2: shows the statistics
      default:
        return <SelectFeelingsFamily />; // default: showse feelings family selection
    }
  };

    // ------------------------------- Return JSX -------------------------------
    // render the tab content for StatisticsOne, including a card to display messages or metrics
  return (
    <TabsContent value="account">
      <Card className="max-w-[350px]">

        {/* displays a message in the header, if showMEtricsOne if false (not enough check-ins) */}
        {!showMetricsOne && (
          <CardHeader>
            <MessageCheckInsM1 /> 
          </CardHeader>
        )}

{/* display the appropriate content based on MetricsOneStaus */}
        <CardContent className="space-y-2">
          {/* render either the feelings familys selection or the statistics */}
          {renderMetricsOne()}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default StatisticOneTabsContent;
