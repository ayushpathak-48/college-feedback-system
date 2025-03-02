/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataTable } from "@/components/data-table";
import { columns } from "@/app/(root)/(admin)/feedbacks/components/columns";
import React from "react";
import { getAllFeedbacks } from "@/actions/admin.actions";
import { Query } from "node-appwrite";
import { AverageStatsCard } from "@/components/average-stats-card";
import { ChartColumn } from "lucide-react";
import { getAverageFeedbackStars } from "@/lib/utils";
const Page = async ({ params }: { params: any }) => {
  const { facultyId } = await params;
  const queries = [Query.equal("faculty", facultyId)];
  const allFeedbacks = (await getAllFeedbacks(queries)).data?.documents;
  return (
    <div>
      <div className="px-4 py-8 flex items-center flex-wrap gap-6">
        <AverageStatsCard
          label="Total Feedbacks"
          icon={ChartColumn}
          value={allFeedbacks!.length.toString()}
        />
        <AverageStatsCard
          label="Total Comments"
          icon={ChartColumn}
          value={allFeedbacks!
            .filter(({ comment }) => comment && comment != "")
            .length.toString()}
        />
        <AverageStatsCard
          label="Teaching Quality"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            allFeedbacks || [],
            "teaching_quality"
          )}/5`}
        />
        <AverageStatsCard
          label="Communication Skills"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            allFeedbacks || [],
            "communication_skills"
          )}/5`}
        />
        <AverageStatsCard
          label="Subject Knowledge"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            allFeedbacks || [],
            "subject_knowledge"
          )}/5`}
        />
        <AverageStatsCard
          label="Student Engagement"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            allFeedbacks || [],
            "student_engagement"
          )}/5`}
        />
        <AverageStatsCard
          label="Punctuality & Discipline"
          icon={ChartColumn}
          value={`${getAverageFeedbackStars(
            allFeedbacks || [],
            "punctuality_and_discipline"
          )}/5`}
        />
      </div>
      <DataTable
        columns={columns}
        data={allFeedbacks || []}
        showFeedbackFilters
        headerTitle={`Single Faculty Feedbacks`}
        hideSearch
      />
    </div>
  );
};

export default Page;
