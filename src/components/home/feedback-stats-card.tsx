"use client";

import { ChartColumn } from "lucide-react";
import { AverageStatsCard } from "../average-stats-card";
import { CoursesType, FacultyType, FeedbackType, StudentType } from "@/types";

const FeedbackStatsCards = ({
  feedbacks,
  students,
  courses,
  faculties,
}: {
  feedbacks?: { documents: FeedbackType[]; total: number };
  students?: { documents: StudentType[]; total: number };
  courses?: { documents: CoursesType[]; total: number };
  faculties?: { documents: FacultyType[]; total: number };
}) => {
  return (
    <div className="py-8 flex items-center flex-wrap gap-6">
      <AverageStatsCard
        label="Total Feedbacks"
        icon={ChartColumn}
        value={feedbacks?.total?.toString()}
      />
      <AverageStatsCard
        label="Total Students"
        icon={ChartColumn}
        value={students && students?.total?.toString()}
      />
      <AverageStatsCard
        label="Total Faculties"
        icon={ChartColumn}
        value={faculties && faculties?.total?.toString()}
      />
      <AverageStatsCard
        label="Total Courses"
        icon={ChartColumn}
        value={courses && courses?.total?.toString()}
      />
    </div>
  );
};

export default FeedbackStatsCards;
