// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { FacultyMemberType } from "@/types";
import { useDataStore } from "@/stores/data.store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChartColumn, Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { cn, getAverageFeedbackStars } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { AverageStatsCard } from "@/components/average-stats-card";
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

const chartConfig = {
  views: {
    label: "label",
  },
  value: {
    label: "Desktop",
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

export const FacultyMemberReportClient = ({
  members,
}: {
  members: FacultyMemberType[];
}) => {
  const feedbacks = useDataStore((state) => state.feedbacks);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [chartData, setChartData] = useState({
    teaching_quality: [],
    communication_skills: [],
    student_engagement: [],
    punctuality_and_discipline: [],
    subject_knowledge: [],
  });
  const [open, setOpen] = useState(false);
  const [activeFacultyMember, setActiveFacultyMember] = useQueryState(
    "faculty_member",
    {
      defaultValue: members[0].$id || "",
    }
  );

  const [reportData, setReportData] = useState({});

  useEffect(() => {
    if (activeFacultyMember && feedbacks) {
      const data = feedbacks?.filter(
        ({ faculty }) => faculty?.$id == activeFacultyMember
      );
      setReportData(data);
    }
    setIsPageLoading(false);
  }, [feedbacks, activeFacultyMember]);

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

  if (isPageLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Label>Select Faculty Member</Label>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                !activeFacultyMember && "text-muted-foreground"
              )}
            >
              {activeFacultyMember
                ? members.find((member) => member?.$id === activeFacultyMember)
                    ?.name
                : "Select member"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search member..." className="h-9" />
            <CommandList>
              <CommandEmpty>No members found.</CommandEmpty>
              <CommandGroup>
                {members.map((member) => (
                  <CommandItem
                    value={member?.name}
                    key={member?.$id}
                    onSelect={() => {
                      setActiveFacultyMember(member?.$id);
                      setOpen(false);
                    }}
                  >
                    {member?.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        member?.$id === activeFacultyMember
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="py-8 flex items-center flex-wrap gap-6">
        <AverageStatsCard
          label="Total Feedbacks"
          icon={ChartColumn}
          value={reportData?.length?.toString()}
        />
        <AverageStatsCard
          label="Total Comments"
          icon={ChartColumn}
          value={
            reportData &&
            reportData
              ?.filter(({ comment }) => comment && comment != "")
              ?.length?.toString()
          }
        />
        <AverageStatsCard
          label="Teaching Quality"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            reportData || [],
            "teaching_quality"
          )}/5`}
        />
        <AverageStatsCard
          label="Communication Skills"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            reportData || [],
            "communication_skills"
          )}/5`}
        />
        <AverageStatsCard
          label="Subject Knowledge"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            reportData || [],
            "subject_knowledge"
          )}/5`}
        />
        <AverageStatsCard
          label="Student Engagement"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            reportData || [],
            "student_engagement"
          )}/5`}
        />
        <AverageStatsCard
          label="Punctuality & Discipline"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            reportData || [],
            "punctuality_and_discipline"
          )}/5`}
        />
      </div>
      <DottedSeparator className="my-5" />
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
