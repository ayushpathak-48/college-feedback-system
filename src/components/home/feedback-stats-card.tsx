/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartColumn } from "lucide-react";
import { AverageStatsCard } from "../average-stats-card";
import { StudentType } from "@/types";
import { useDataStore } from "@/stores/data.store";

const FeedbackStatsCards = ({ students }: { students: StudentType }) => {
  const feedbacks = useDataStore((state) => state.feedbacks);
  return (
    <div className="py-8 flex items-center flex-wrap gap-6">
      <AverageStatsCard
        label="Total Feedbacks"
        icon={ChartColumn}
        value={feedbacks?.length?.toString()}
      />
      <AverageStatsCard
        label="Students submitted feedback"
        icon={ChartColumn}
        value={
          students &&
          students
            ?.filter(
              ({ submittedFacultyMemberReviews }: any) =>
                submittedFacultyMemberReviews &&
                submittedFacultyMemberReviews?.length > 0
            )
            ?.length?.toString()
        }
      />
      <AverageStatsCard
        label="Students not submitted feedback"
        icon={ChartColumn}
        value={
          students &&
          students
            ?.filter(
              ({ submittedFacultyMemberReviews }: any) =>
                submittedFacultyMemberReviews &&
                submittedFacultyMemberReviews?.length > 0
            )
            .filter(({ gender }: any) => gender == "MALE")
            ?.length?.toString()
        }
      />
      <AverageStatsCard
        label="Total Comments"
        icon={ChartColumn}
        value={
          feedbacks &&
          feedbacks
            ?.filter(({ comment }: any) => comment && comment != "")
            ?.length?.toString()
        }
      />
      <AverageStatsCard
        label="Total Male students"
        icon={ChartColumn}
        value={
          students &&
          students
            ?.filter(
              ({ submittedFacultyMemberReviews }: any) =>
                submittedFacultyMemberReviews &&
                submittedFacultyMemberReviews?.length > 0
            )
            .filter(({ gender }: any) => gender == "MALE")
            ?.length?.toString()
        }
      />
      <AverageStatsCard
        label="Total Female students"
        icon={ChartColumn}
        value={
          students &&
          students
            ?.filter(
              ({ submittedFacultyMemberReviews }: any) =>
                submittedFacultyMemberReviews &&
                submittedFacultyMemberReviews?.length > 0
            )
            .filter(({ gender }: any) => gender == "FEMALE")
            ?.length?.toString()
        }
      />
    </div>
  );
};

export default FeedbackStatsCards;
