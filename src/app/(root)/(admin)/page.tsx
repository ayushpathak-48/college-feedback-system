import React from "react";
import FeedbackStatsCards from "@/components/home/feedback-stats-card";
import { getLimitedDocuments } from "@/actions/stats.actions";
import { appwriteConfig } from "@/lib/appwrite/config";
import { CoursesType, FacultyType, FeedbackType, StudentType } from "@/types";
import { LatestFeedbacksCard } from "@/components/home/latest-feedbacks-card";

const page = async () => {
  const feedbacks = await getLimitedDocuments<FeedbackType>(
    appwriteConfig.feedbacksCollectionId
  );
  const students = await getLimitedDocuments<StudentType>(
    appwriteConfig.studentsCollectionId
  );
  const courses = await getLimitedDocuments<CoursesType>(
    appwriteConfig.coursesCollectionId
  );
  const faculties = await getLimitedDocuments<FacultyType>(
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
