import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

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

export default function MetricsRadialChart({
  chartTitle,
  checkIns,
  endAngle,
  percentage,
}) {
  const chartData = [
    {
      percentage: percentage,
      fill: "var(--color-value)",
    },
  ];

  return (
    <Card className="flex flex-col border-none shadow-none w-[110px] h-[140px] mb-5 mr-5">
      <CardContent className="flex flex-col justify-center items-center pl-0 pr-0 pb-0">
        <ChartContainer
          config={chartConfig}
          className=" mx-auto aspect-square max-h-[130px]"
        >
          <p className="font-bold text-sm text-center w-[122px] ">
            {chartTitle}
          </p>
          {/* radial chart (black - depict percentage) */}
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={endAngle} //{108} // muss dynamisch werden - 360 = 100 %
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
                          {`${percentage}%`}
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
