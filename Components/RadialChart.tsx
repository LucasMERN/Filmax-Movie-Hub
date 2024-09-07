"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardTitle } from "@/Components/ui/card";

import { ChartConfig, ChartContainer } from "@/Components/ui/chart";

export function RadialChart({
  voteCount,
  voteAverage,
}: {
  voteCount: number;
  voteAverage: number;
}) {
  const chartData = [
    { browser: "safari", visitors: voteAverage, fill: "var(--color-safari)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="absolute -top-24 right-0 hidden flex-col shadow-none lg:flex">
      <CardTitle className="dark-shadow pb-2 text-center text-lg font-semibold text-white">
        Audience Score
      </CardTitle>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-h-[180px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(voteAverage / 10) * 360}
            innerRadius={75}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-transparent last:fill-transparent"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background={false} cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-4xl font-bold"
                        >
                          {voteAverage}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white"
                        >
                          {voteCount}
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
