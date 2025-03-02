import { getAccount } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";
import FeedbackStatsCards from "@/components/home/feedback-stats-card";
import { getLatestFiveDocuments } from "@/actions/stats.actions";
import { appwriteConfig } from "@/lib/appwrite/config";
import { CoursesType, FacultyType, FeedbackType, StudentType } from "@/types";
import { LatestFeedbacksCard } from "@/components/home/latest-feedbacks-card";

const page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }

  if (!account.labels.includes("admin")) return redirect("/submit-feedback");
  const feedbacks = await getLatestFiveDocuments<FeedbackType>(
    appwriteConfig.feedbacksCollectionId
  );
  const students = await getLatestFiveDocuments<StudentType>(
    appwriteConfig.studentsCollectionId
  );
  const courses = await getLatestFiveDocuments<CoursesType>(
    appwriteConfig.coursesCollectionId
  );
  const faculties = await getLatestFiveDocuments<FacultyType>(
    appwriteConfig.facultiesCollectionId
  );
  return (
    <div>
      <FeedbackStatsCards
        feedbacks={feedbacks}
        students={students}
        courses={courses}
        faculties={faculties}
      />
      <LatestFeedbacksCard feedbacks={feedbacks.documents} className="w-full" />
    </div>
  );
};

export default page;
