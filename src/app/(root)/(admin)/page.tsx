import { getAccount } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";
import { ReportDataClient } from "./reports/components/report-data-client";
import {
  getAllCourses,
  getAllFaculties,
  getAllFacultyMembers,
  getAllFeedbacks,
  getAllStudents,
} from "@/actions/admin.actions";
import FeedbackStatsCards from "@/components/home/feedback-stats-card";

const page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }

  if (!account.labels.includes("admin")) return redirect("/submit-feedback");
  const feedbacks = (await getAllFeedbacks()).data?.documents;
  const students = (await getAllStudents()).data?.documents;
  const courses = (await getAllCourses()).data?.documents;
  const faculties = (await getAllFaculties()).data?.documents;
  const facultyMembers = (await getAllFacultyMembers()).data?.documents;
  return (
    <div>
      <ReportDataClient feedbacks={feedbacks} />
      <FeedbackStatsCards
        students={students || []}
        courses={courses || []}
        faculties={faculties || []}
        facultyMembers={facultyMembers || []}
      />
    </div>
  );
};

export default page;
