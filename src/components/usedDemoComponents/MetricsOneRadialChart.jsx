import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

// static-data:
// TODO: Werte dynmisch machen und als props
const chartData = [
  { percent: "value", percentage: 30, fill: "var(--color-value)" }, // fill kommt von chartConfig - color
];

// former TypeScript-part:
// chart-configuration:
const chartConfig = {
  percentage: {
    label: "CheckIn",
  },
  value: {
    label: "Percent",
    color: "black",
  },
};

// TODO: Größe anpassen => verkleinern

export default function MetricsOneRadialChart({ chartTitle, checkIns }) {
  return (
    <Card className="flex flex-col border-none shadow-none w-[200px] h-[200px]">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[150px]"
        >
          <p className="text-md text-center">{chartTitle}</p>
          {/* radial chart (black - depict percentage) */}
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={108} // muss dynamisch werden - 360 = 100 %
            innerRadius={49} // {80}
            outerRadius={73} // {110}
          >
            {/* inner circle (chart) */}
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none" // border circle
              className="first:fill-background last:fill-white" // first:circle last: space inside circle
              polarRadius={[53, 44]} //{[86, 74]}
            />

            {/* create radial bar: */}
            <RadialBar dataKey="percentage" background cornerRadius={10} />
            {/* create inner circle with text/percentage: */}
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              {/* tick, tickLine and axisLine are axis markings */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle" // centers text
                        dominantBaseline="middle" // centers text
                      >
                        {/* percentage */}
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartData[0].percentage.toLocaleString() + "%"}
                        </tspan>
                        {/* check-ins */}
                        {/* TODO: Wert für check-ins muss dynamisch werden */}
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {checkIns}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
