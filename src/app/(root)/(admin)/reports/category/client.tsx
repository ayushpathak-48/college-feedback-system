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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  views: {
    label: "label",
  },
  value: {
    label: "Avg. rating",
  },
  total_feedbacks: {
    label: "Total Feedbacks",
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
    total_feedbacks: faculty.count,
  }));
};

export const CategoryReportClient = () => {
  const feedbacks = useDataStore((state) => state.feedbacks);

  const [viewChartType, setViewChartType] = useState({
    teaching_quality: "both",
    communication_skills: "both",
    student_engagement: "both",
    punctuality_and_discipline: "both",
    subject_knowledge: "both",
  });

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
    console.log({ teaching_quality });
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
        <div className="flex items-center justify-between px-5">
          <CardHeader className="px-0">
            <CardTitle>Teaching Quality</CardTitle>
          </CardHeader>
          <Select
            onValueChange={(val) => {
              setViewChartType({ ...viewChartType, teaching_quality: val });
            }}
            value={viewChartType.teaching_quality}
          >
            <SelectTrigger className="w-max">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"both"}>Both</SelectItem>
              <SelectItem value={"avg"}>Avg. Rating</SelectItem>
              <SelectItem value={"total_feedbacks"}>Total Feedbacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                tickCount={10}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) => {
                      return `${value}`;
                    }}
                  />
                }
              />

              <Bar
                hide={viewChartType.teaching_quality == "total_feedbacks"}
                dataKey={"value"}
                fill="hsl(var(--primary))"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}`;
                  }}
                />
              </Bar>
              <Bar
                hide={viewChartType.teaching_quality == "avg"}
                dataKey={"total_feedbacks"}
                fill="hsl(198.6 88.7% 48.4%)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={5}
                  className="fill-black"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <DottedSeparator className="my-5" />
      <Card className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-5">
          <CardHeader className="px-0">
            <CardTitle>Communication Skills</CardTitle>
          </CardHeader>
          <Select
            onValueChange={(val) => {
              setViewChartType({ ...viewChartType, communication_skills: val });
            }}
            value={viewChartType.communication_skills}
          >
            <SelectTrigger className="w-max">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"both"}>Both</SelectItem>
              <SelectItem value={"avg"}>Avg. Rating</SelectItem>
              <SelectItem value={"total_feedbacks"}>Total Feedbacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                tickCount={10}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) => {
                      return `${value}`;
                    }}
                  />
                }
              />

              <Bar
                hide={viewChartType.communication_skills == "total_feedbacks"}
                dataKey={"value"}
                fill="hsl(var(--primary))"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}`;
                  }}
                />
              </Bar>
              <Bar
                hide={viewChartType.communication_skills == "avg"}
                dataKey={"total_feedbacks"}
                fill="hsl(198.6 88.7% 48.4%)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <DottedSeparator className="my-5" />
      <Card className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-5">
          <CardHeader className="px-0">
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <Select
            onValueChange={(val) => {
              setViewChartType({ ...viewChartType, student_engagement: val });
            }}
            value={viewChartType.student_engagement}
          >
            <SelectTrigger className="w-max">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"both"}>Both</SelectItem>
              <SelectItem value={"avg"}>Avg. Rating</SelectItem>
              <SelectItem value={"total_feedbacks"}>Total Feedbacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                tickCount={10}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) => {
                      return `${value}`;
                    }}
                  />
                }
              />

              <Bar
                hide={viewChartType.student_engagement == "total_feedbacks"}
                dataKey={"value"}
                fill="hsl(var(--primary))"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}`;
                  }}
                />
              </Bar>
              <Bar
                hide={viewChartType.student_engagement == "avg"}
                dataKey={"total_feedbacks"}
                fill="hsl(198.6 88.7% 48.4%)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <DottedSeparator className="my-5" />
      <Card className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-5">
          <CardHeader className="px-0">
            <CardTitle>Subject Knowledge</CardTitle>
          </CardHeader>
          <Select
            onValueChange={(val) => {
              setViewChartType({ ...viewChartType, subject_knowledge: val });
            }}
            value={viewChartType.subject_knowledge}
          >
            <SelectTrigger className="w-max">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"both"}>Both</SelectItem>
              <SelectItem value={"avg"}>Avg. Rating</SelectItem>
              <SelectItem value={"total_feedbacks"}>Total Feedbacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                tickCount={10}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) => {
                      return `${value}`;
                    }}
                  />
                }
              />

              <Bar
                hide={viewChartType.subject_knowledge == "total_feedbacks"}
                dataKey={"value"}
                fill="hsl(var(--primary))"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}`;
                  }}
                />
              </Bar>
              <Bar
                hide={viewChartType.subject_knowledge == "avg"}
                dataKey={"total_feedbacks"}
                fill="hsl(198.6 88.7% 48.4%)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <DottedSeparator className="my-5" />
      <Card className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-5">
          <CardHeader className="px-0">
            <CardTitle>Punctuality and Discipline</CardTitle>
          </CardHeader>
          <Select
            onValueChange={(val) => {
              setViewChartType({
                ...viewChartType,
                punctuality_and_discipline: val,
              });
            }}
            value={viewChartType.punctuality_and_discipline}
          >
            <SelectTrigger className="w-max">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"both"}>Both</SelectItem>
              <SelectItem value={"avg"}>Avg. Rating</SelectItem>
              <SelectItem value={"total_feedbacks"}>Total Feedbacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                tickCount={10}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) => {
                      return `${value}`;
                    }}
                  />
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) => {
                      return `${value}`;
                    }}
                  />
                }
              />

              <Bar
                hide={
                  viewChartType.punctuality_and_discipline == "total_feedbacks"
                }
                dataKey={"value"}
                fill="hsl(var(--primary))"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                  formatter={(value) => {
                    return `${value}`;
                  }}
                />
              </Bar>
              <Bar
                hide={viewChartType.punctuality_and_discipline == "avg"}
                dataKey={"total_feedbacks"}
                fill="hsl(198.6 88.7% 48.4%)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-black"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
