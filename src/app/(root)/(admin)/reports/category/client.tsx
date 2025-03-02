// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useDataStore } from "@/stores/data.store";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { AverageStatsCard } from "@/components/average-stats-card";
// import { ChartColumn } from "lucide-react";

const chartConfig = {
  views: {
    label: "label",
  },
  value: {
    label: "Avg. rating",
    color: "",
  },
} satisfies ChartConfig;

const transformDataForChart = (data, key) => {
  if (!data?.length) return;
  const facultyMap = {};

  data?.forEach((ele) => {
    const facultyId = ele?.faculty?.$id;
    const facultyName = ele?.faculty?.name;

    if (!facultyMap[facultyId]) {
      facultyMap[facultyId] = {
        key: key,
        id: facultyId,
        label: facultyName,
        value: 0,
        count: 0,
      };
    }
    facultyMap[facultyId].value += parseFloat(ele?.[key]) || 0;
    facultyMap[facultyId].count += 1;
  });
  return Object.values(facultyMap).map((faculty) => ({
    key: faculty.key,
    id: faculty.id,
    label: faculty.label,
    value: faculty.count > 0 ? (faculty.value / faculty.count).toFixed(2) : 0,
  }));
};

export const CategoryReportClient = () => {
  const feedbacks = useDataStore((state) => state.feedbacks);
  const [chartData, setChartData] = useState({
    teaching_quality: [],
    communication_skills: [],
    student_engagement: [],
    punctuality_and_discipline: [],
    subject_knowledge: [],
  });

  useEffect(() => {
    const teaching_quality = transformDataForChart(
      feedbacks,
      "teaching_quality"
    );
    const communication_skills = transformDataForChart(
      feedbacks,
      "communication_skills"
    );
    const student_engagement = transformDataForChart(
      feedbacks,
      "student_engagement"
    );
    const punctuality_and_discipline = transformDataForChart(
      feedbacks,
      "punctuality_and_discipline"
    );
    const subject_knowledge = transformDataForChart(
      feedbacks,
      "subject_knowledge"
    );
    setChartData({
      teaching_quality,
      communication_skills,
      student_engagement,
      punctuality_and_discipline,
      subject_knowledge,
    });
  }, [feedbacks]);

  return (
    <div>
      {/* <DottedSeparator /> */}
      <Card className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Teaching Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData.teaching_quality}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="value"
                    labelFormatter={(value) => {
                      return `${value}`;
                    }}
                  />
                }
              />
              <Bar dataKey={"value"} fill="hsl(var(--primary))" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}/5`;
                  }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <DottedSeparator className="my-5" />
      <Card className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Communication Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData.communication_skills}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="value"
                    labelFormatter={(value) => {
                      return value;
                    }}
                  />
                }
              />
              <Bar dataKey={"value"} fill="hsl(var(--primary))" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}/5`;
                  }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <DottedSeparator className="my-5" />
      <Card className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Student Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData.student_engagement}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="value"
                    labelFormatter={(value) => {
                      return value;
                    }}
                  />
                }
              />
              <Bar dataKey={"value"} fill="hsl(var(--primary))" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}/5`;
                  }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <DottedSeparator className="my-5" />
      <Card className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Subject Knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData.subject_knowledge}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="value"
                    labelFormatter={(value) => {
                      return value;
                    }}
                  />
                }
              />
              <Bar dataKey={"value"} fill="hsl(var(--primary))" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}/5`;
                  }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <DottedSeparator className="my-5" />
      <Card className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Punctuality and Discipline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData.punctuality_and_discipline}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="value"
                    labelFormatter={(value) => {
                      return value;
                    }}
                  />
                }
              />
              <Bar dataKey={"value"} fill="hsl(var(--primary))" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}/5`;
                  }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
