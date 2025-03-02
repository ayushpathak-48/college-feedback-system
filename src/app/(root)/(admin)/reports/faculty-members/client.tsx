// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { FacultyMemberType, FeedbackType } from "@/types";
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

export const FacultyMemberReportClient = ({
  members,
}: {
  members: FacultyMemberType[];
}) => {
  const feedbacks = useDataStore((state) => state.feedbacks);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeFacultyMember, setActiveFacultyMember] = useQueryState(
    "faculty_member",
    {
      defaultValue: members[0].$id || "",
    }
  );

  const [reportData, setReportData] = useState<FeedbackType[]>([]);

  useEffect(() => {
    if (activeFacultyMember && feedbacks) {
      const data = feedbacks?.filter(
        ({ faculty }) => faculty?.$id == activeFacultyMember
      );
      setReportData(data);
    }
    setIsPageLoading(false);
  }, [feedbacks, activeFacultyMember]);

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
    </div>
  );
};
