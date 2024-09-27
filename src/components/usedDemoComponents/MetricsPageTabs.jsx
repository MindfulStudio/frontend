// ------------------------------- importing components and context -------------------------------
// components:
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticOneTabsContent from "./StatisticOneTabsContent";
import StatisticTwoTabsContent from "./StatisticTwoTabsContent";
// context providers:
import { useMetricsContext } from "@/utils/MetricsProvider";

// ------------------------------- MetricsPageTabs Component -------------------------------
export function MetricsPageTabs() {
  // destructure values and functions from MetricsContext
  const { setMetricsOneStatus, setMetricsTwoStatus } = useMetricsContext();

  // ------------------------------- Return JSX -------------------------------
  // render the tabs components with two triggers and corresponding content for each tag
  return (
    <main>
      <Tabs defaultValue="account" className="max-w-[350px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="account"
            onClick={() => setMetricsTwoStatus(null)} // vielleicht nicht so gut? => besser 0?
          >
            erlebte Emotionen
          </TabsTrigger>
          <TabsTrigger
            value="password"
            onClick={() => setMetricsOneStatus(null)} // vielleicht nicht so gut? => besser 0?
          >
            emotionale Auslöser
          </TabsTrigger>
        </TabsList>

        {/* statistic ONE */}
        <StatisticOneTabsContent />

        {/* statistic TWO */}
        <StatisticTwoTabsContent />
      </Tabs>
    </main>
  );
}
