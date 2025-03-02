/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChartColumn } from "lucide-react";
import { AverageStatsCard } from "../average-stats-card";
import {
  CoursesType,
  FacultyMemberType,
  FacultyType,
  StudentType,
} from "@/types";
import { useDataStore } from "@/stores/data.store";

const FeedbackStatsCards = ({
  students,
  courses,
  faculties,
  facultyMembers,
}: {
  students: StudentType[];
  courses: CoursesType[];
  faculties: FacultyType[];
  facultyMembers: FacultyMemberType[];
}) => {
  const feedbacks = useDataStore((state) => state.feedbacks);
  return (
    <div className="py-8 flex items-center flex-wrap gap-6">
      <AverageStatsCard
        label="Total Feedbacks"
        icon={ChartColumn}
        value={feedbacks?.length?.toString()}
      />
      <AverageStatsCard
        label="Total Students"
        icon={ChartColumn}
        value={students && students?.length?.toString()}
      />
      <AverageStatsCard
        label="Total Faculties"
        icon={ChartColumn}
        value={faculties && faculties?.length?.toString()}
      />
      <AverageStatsCard
        label="Total Courses"
        icon={ChartColumn}
        value={courses && courses?.length?.toString()}
      />
      <AverageStatsCard
        label="Total Faculty Members"
        icon={ChartColumn}
        value={facultyMembers && facultyMembers?.length?.toString()}
      />
    </div>
  );
};

export default FeedbackStatsCards;
