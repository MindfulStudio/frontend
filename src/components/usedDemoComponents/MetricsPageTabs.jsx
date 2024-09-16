import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticOneTabsContent from "./StatisticOneTabsContent";
import StatisticTwoTabsContent from "./StatisticTwoTabsContent";

export function MetricsPageTabs() {
  return (
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
  );
}
