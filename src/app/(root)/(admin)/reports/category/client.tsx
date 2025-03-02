/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { Check, ChevronsUpDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { AverageStatsCard } from "@/components/average-stats-card";
import generatePDF from "react-to-pdf";

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

const transformDataForChart = (data, key, facultyId) => {
  if (!data?.length) return;
  const facultyMap = {};

  data
    ?.filter(({ faculty }) => faculty?.faculty?.$id == facultyId)
    ?.forEach((ele) => {
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
  const [faculties, setFaculties] = useState([]);
  const [open, setOpen] = useState(false);

  const [activeFaculty, setActiveFaculty] = useQueryState("faculty", {
    defaultValue: "",
  });

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

  const [highestLowData, setHighestLowData] = useState({
    teaching_quality: {
      highest: {
        name: "",
        value: "",
        total_feedbacks: 0,
      },
      lowest: { name: "", value: "", total_feedbacks: 0 },
    },
    communication_skills: {
      highest: {
        name: "",
        value: "",
        total_feedbacks: 0,
      },
      lowest: { name: "", value: "", total_feedbacks: 0 },
    },
    student_engagement: {
      highest: {
        name: "",
        value: "",
        total_feedbacks: 0,
      },
      lowest: { name: "", value: "", total_feedbacks: 0 },
    },
    punctuality_and_discipline: {
      highest: {
        name: "",
        value: "",
        total_feedbacks: 0,
      },
      lowest: { name: "", value: "", total_feedbacks: 0 },
    },
    subject_knowledge: {
      highest: {
        name: "",
        value: "",
        total_feedbacks: 0,
      },
      lowest: { name: "", value: "", total_feedbacks: 0 },
    },
  });

  useEffect(() => {
    const uniqueFacultyMembers = Array.from(
      new Map(feedbacks?.map(({ faculty }) => [faculty.$id, faculty])).values()
    );

    const uniqueFaculties = Array.from(
      new Map(
        uniqueFacultyMembers?.map(({ faculty }) => [faculty.$id, faculty])
      ).values()
    );

    setFaculties(uniqueFaculties);
  }, [feedbacks]);

  useEffect(() => {
    if (faculties?.length && !activeFaculty) {
      setActiveFaculty(faculties[0]?.$id);
    }
  }, [faculties]);

  useEffect(() => {
    if (feedbacks && activeFaculty) {
      const teaching_quality = transformDataForChart(
        feedbacks,
        "teaching_quality",
        activeFaculty
      );

      console.log({ teaching_quality });

      const communication_skills = transformDataForChart(
        feedbacks,
        "communication_skills",
        activeFaculty
      );
      const student_engagement = transformDataForChart(
        feedbacks,
        "student_engagement",
        activeFaculty
      );
      const punctuality_and_discipline = transformDataForChart(
        feedbacks,
        "punctuality_and_discipline",
        activeFaculty
      );
      const subject_knowledge = transformDataForChart(
        feedbacks,
        "subject_knowledge",
        activeFaculty
      );
      setChartData({
        teaching_quality,
        communication_skills,
        student_engagement,
        punctuality_and_discipline,
        subject_knowledge,
      });

      const highestTeachingQuality = teaching_quality?.reduce(
        (max, obj) =>
          parseFloat(obj.value) > parseFloat(max.value) ? obj : max,
        teaching_quality[0]
      );
      const lowestTeachingQuality = teaching_quality?.reduce(
        (min, obj) =>
          parseFloat(obj.value) < parseFloat(min.value) ? obj : min,
        teaching_quality[0]
      );

      console.log({ lowestTeachingQuality, highestTeachingQuality });

      const teachingQualityResult = {
        highest: {
          name: highestTeachingQuality?.label?.trim(),
          value: highestTeachingQuality?.value,
          total_feedbacks: highestTeachingQuality?.total_feedbacks,
        },
        lowest: {
          name: lowestTeachingQuality?.label?.trim(),
          value: lowestTeachingQuality?.value,
          total_feedbacks: lowestTeachingQuality?.total_feedbacks,
        },
      };

      const highestCommunicationSkills = communication_skills?.reduce(
        (max, obj) =>
          parseFloat(obj.value) > parseFloat(max.value) ? obj : max,
        communication_skills[0]
      );
      const lowestCommunicationSkills = communication_skills?.reduce(
        (min, obj) =>
          parseFloat(obj.value) < parseFloat(min.value) ? obj : min,
        communication_skills[0]
      );

      const communicationSkillsResult = {
        highest: {
          name: highestCommunicationSkills?.label?.trim(),
          value: highestCommunicationSkills?.value,
          total_feedbacks: highestCommunicationSkills?.total_feedbacks,
        },
        lowest: {
          name: lowestCommunicationSkills?.label?.trim(),
          value: lowestCommunicationSkills?.value,
          total_feedbacks: lowestCommunicationSkills?.total_feedbacks,
        },
      };

      const highestStudentEngagement = student_engagement?.reduce(
        (max, obj) =>
          parseFloat(obj.value) > parseFloat(max.value) ? obj : max,
        student_engagement[0]
      );
      const lowestStudentEngagement = student_engagement?.reduce(
        (min, obj) =>
          parseFloat(obj.value) < parseFloat(min.value) ? obj : min,
        student_engagement[0]
      );

      const studentEngagementResult = {
        highest: {
          name: highestStudentEngagement?.label?.trim(),
          value: highestStudentEngagement?.value,
          total_feedbacks: highestStudentEngagement?.total_feedbacks,
        },
        lowest: {
          name: lowestStudentEngagement?.label?.trim(),
          value: lowestStudentEngagement?.value,
          total_feedbacks: lowestStudentEngagement?.total_feedbacks,
        },
      };

      const highestPunctualityAndDiscipline =
        punctuality_and_discipline?.reduce(
          (max, obj) =>
            parseFloat(obj.value) > parseFloat(max.value) ? obj : max,
          punctuality_and_discipline[0]
        );
      const lowestPunctualityAndDiscipline = punctuality_and_discipline?.reduce(
        (min, obj) =>
          parseFloat(obj.value) < parseFloat(min.value) ? obj : min,
        punctuality_and_discipline[0]
      );

      const punctualityAndDisciplineResult = {
        highest: {
          name: highestPunctualityAndDiscipline?.label?.trim(),
          value: highestPunctualityAndDiscipline?.value,
          total_feedbacks: highestPunctualityAndDiscipline?.total_feedbacks,
        },
        lowest: {
          name: lowestPunctualityAndDiscipline?.label?.trim(),
          value: lowestPunctualityAndDiscipline?.value,
          total_feedbacks: lowestPunctualityAndDiscipline?.total_feedbacks,
        },
      };

      const highestSubjectKnowledge = subject_knowledge?.reduce(
        (max, obj) =>
          parseFloat(obj.value) > parseFloat(max.value) ? obj : max,
        subject_knowledge[0]
      );
      const lowestSubjectKnowledge = subject_knowledge?.reduce(
        (min, obj) =>
          parseFloat(obj.value) < parseFloat(min.value) ? obj : min,
        subject_knowledge[0]
      );

      const subjectKnowledgeResult = {
        highest: {
          name: highestSubjectKnowledge?.label?.trim(),
          value: highestSubjectKnowledge?.value,
          total_feedbacks: highestSubjectKnowledge?.total_feedbacks,
        },
        lowest: {
          name: lowestSubjectKnowledge?.label?.trim(),
          value: lowestSubjectKnowledge?.value,
          total_feedbacks: lowestSubjectKnowledge?.total_feedbacks,
        },
      };

      setHighestLowData({
        teaching_quality: teachingQualityResult,
        communication_skills: communicationSkillsResult,
        student_engagement: studentEngagementResult,
        punctuality_and_discipline: punctualityAndDisciplineResult,
        subject_knowledge: subjectKnowledgeResult,
      });
    }
  }, [activeFaculty, feedbacks]);

  return (
    <div>
      {faculties?.length && activeFaculty ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="mb-4">
              <Label>Select Faculty</Label>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !activeFaculty && "text-muted-foreground"
                )}
              >
                {activeFaculty
                  ? faculties.find((member) => member?.$id === activeFaculty)
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
                  {faculties.map((member) => (
                    <CommandItem
                      value={member?.name}
                      key={member?.$id}
                      onSelect={() => {
                        setActiveFaculty(member?.$id);
                        setOpen(false);
                      }}
                    >
                      {member?.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          member?.$id === activeFaculty
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
      ) : (
        <></>
      )}
      <ChartCard
        title={"Teaching Quality"}
        dataKey={"teaching_quality"}
        chartData={chartData.teaching_quality}
        highestRatedName={highestLowData?.teaching_quality?.highest?.name}
        highestRatedValue={highestLowData?.teaching_quality?.highest?.value}
        lowestRatedName={highestLowData?.teaching_quality?.lowest?.name}
        lowestRatedValue={highestLowData?.teaching_quality?.lowest?.value}
        viewChartType={viewChartType}
        lowestTotalFeedbacks={
          highestLowData?.teaching_quality?.lowest?.total_feedbacks
        }
        highestTotalFeedbacks={
          highestLowData?.teaching_quality?.highest?.total_feedbacks
        }
        setViewChartType={setViewChartType}
      />
      <DottedSeparator className="my-5" />
      <ChartCard
        title={"Communication Skills"}
        dataKey={"communication_skills"}
        chartData={chartData.communication_skills}
        highestRatedName={highestLowData?.communication_skills?.highest?.name}
        highestRatedValue={highestLowData?.communication_skills?.highest?.value}
        lowestRatedName={highestLowData?.communication_skills?.lowest?.name}
        lowestRatedValue={highestLowData?.communication_skills?.lowest?.value}
        viewChartType={viewChartType}
        lowestTotalFeedbacks={
          highestLowData?.communication_skills?.lowest?.total_feedbacks
        }
        highestTotalFeedbacks={
          highestLowData?.communication_skills?.highest?.total_feedbacks
        }
        setViewChartType={setViewChartType}
      />
      <DottedSeparator className="my-5" />
      <ChartCard
        title={"Student Engagement"}
        dataKey={"student_engagement"}
        chartData={chartData.student_engagement}
        highestRatedName={highestLowData?.student_engagement?.highest?.name}
        highestRatedValue={highestLowData?.student_engagement?.highest?.value}
        lowestRatedName={highestLowData?.student_engagement?.lowest?.name}
        lowestRatedValue={highestLowData?.student_engagement?.lowest?.value}
        viewChartType={viewChartType}
        lowestTotalFeedbacks={
          highestLowData?.student_engagement?.lowest?.total_feedbacks
        }
        highestTotalFeedbacks={
          highestLowData?.student_engagement?.highest?.total_feedbacks
        }
        setViewChartType={setViewChartType}
      />
      <DottedSeparator className="my-5" />
      <ChartCard
        title={"Subject Knowledge"}
        dataKey={"subject_knowledge"}
        chartData={chartData.subject_knowledge}
        highestRatedName={highestLowData?.subject_knowledge?.highest?.name}
        highestRatedValue={highestLowData?.subject_knowledge?.highest?.value}
        lowestRatedName={highestLowData?.subject_knowledge?.lowest?.name}
        lowestRatedValue={highestLowData?.subject_knowledge?.lowest?.value}
        viewChartType={viewChartType}
        lowestTotalFeedbacks={
          highestLowData?.subject_knowledge?.lowest?.total_feedbacks
        }
        highestTotalFeedbacks={
          highestLowData?.subject_knowledge?.highest?.total_feedbacks
        }
        setViewChartType={setViewChartType}
      />
      <DottedSeparator className="my-5" />
      <ChartCard
        title={"Punctuality and Discipline"}
        dataKey={"punctuality_and_discipline"}
        chartData={chartData.punctuality_and_discipline}
        highestRatedName={
          highestLowData?.punctuality_and_discipline?.highest?.name
        }
        highestRatedValue={
          highestLowData?.punctuality_and_discipline?.highest?.value
        }
        lowestRatedName={
          highestLowData?.punctuality_and_discipline?.lowest?.name
        }
        lowestRatedValue={
          highestLowData?.punctuality_and_discipline?.lowest?.value
        }
        lowestTotalFeedbacks={
          highestLowData?.punctuality_and_discipline?.lowest?.total_feedbacks
        }
        highestTotalFeedbacks={
          highestLowData?.punctuality_and_discipline?.highest?.total_feedbacks
        }
        viewChartType={viewChartType}
        setViewChartType={setViewChartType}
      />
    </div>
  );
};

const ChartCard = ({
  title,
  dataKey,
  chartData,
  highestRatedName,
  highestRatedValue,
  lowestRatedName,
  lowestRatedValue,
  viewChartType,
  setViewChartType,
  lowestTotalFeedbacks,
  highestTotalFeedbacks,
}: any) => {
  const cardRef = useRef(null);
  const handleDownloadPdf = (fileName: string) => {
    generatePDF(cardRef, { filename: `${fileName}.pdf`, page: { margin: 10 } });
  };

  return (
    <Card ref={cardRef} className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-5">
        <CardHeader className="px-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <div className="flex items-center justify-center gap-3">
          <Select
            onValueChange={(val) => {
              setViewChartType({ ...viewChartType, [dataKey]: val });
            }}
            value={viewChartType[dataKey]}
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
          <Button
            onClick={() => handleDownloadPdf(dataKey)}
            variant="outline"
            role="combobox"
          >
            Export Pdf
            <Download className="opacity-50" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-start gap-4  px-6">
        <AverageStatsCard
          label="Highest Rated"
          value={
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 text-xl text-gray-700 font-medium">
                <div>{highestRatedName}</div>
                <span className="text-emerald-500">{highestRatedValue}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 font-normal">
                <div>Total Feedbacks :</div>
                <span className="text-gray-500">{highestTotalFeedbacks}</span>
              </div>
            </div>
          }
        />
        <AverageStatsCard
          label="Lowest Rated"
          value={
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 text-xl text-gray-700 font-medium">
                <div>{lowestRatedName}</div>
                <span className="text-red-500">{lowestRatedValue}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 font-normal">
                <div>Total Feedbacks :</div>
                <span className="text-gray-500">{lowestTotalFeedbacks}</span>
              </div>
            </div>
            // <div className="flex items-center gap-3 text-xl text-gray-500 font-medium">
            //   <div>{lowestRatedName}</div>
            //   <span className="text-red-500">{lowestRatedValue}</span>
            // </div>
          }
        />
      </div>
      <DottedSeparator className="my-5" />
      <CardContent className="pl-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full "
        >
          <BarChart
            className=""
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
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
              hide={viewChartType[dataKey] == "total_feedbacks"}
              dataKey={"value"}
              fill="hsl(var(--primary))"
              radius={8}
            >
              <LabelList
                position="top"
                offset={5}
                className="fill-black"
                fontSize={12}
                formatter={(value) => {
                  return `${value}`;
                }}
              />
            </Bar>
            <Bar
              hide={viewChartType[dataKey] == "avg"}
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
  );
};
