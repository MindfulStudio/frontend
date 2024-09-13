import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticOneTabsContent from "./StatisticOneTabsContent";
import StatisticTwoTabsContent from "./StatisticTwoTabsContent";

export function MetricsPageTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
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
