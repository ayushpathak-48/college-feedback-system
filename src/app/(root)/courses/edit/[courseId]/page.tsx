/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getAllFaculties, getCourseById } from "@/actions/admin.actions";
import { redirect } from "next/navigation";
import EditCourseForm from "../../components/edit-courses-form";

const page = async ({ params }: { params: any }) => {
  const { courseId } = await params;
  const faculties = (await getAllFaculties()).data?.documents;
  const course = (await getCourseById(courseId)).data;
  if (!course) {
    return redirect("/courses");
  }
  return <EditCourseForm course={course} faculties={faculties || []} />;
};

export default page;
