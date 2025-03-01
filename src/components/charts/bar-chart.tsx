"use client";

import React from "react";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Month",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const chartData = [
  { label: "January", value: 186 },
  { label: "February", value: 305 },
  { label: "March", value: 237 },
  { label: "April", value: 73 },
  { label: "May", value: 209 },
  { label: "June", value: 214 },
  { label: "July", value: 0 },
  { label: "August", value: 0 },
  { label: "September", value: 0 },
  { label: "October", value: 0 },
  { label: "November", value: 0 },
  { label: "December", value: 0 },
];

export const CustomBarChart = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] h-[500px] w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
