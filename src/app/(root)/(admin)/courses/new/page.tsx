import React from "react";
import { getAllFaculties } from "@/actions/admin.actions";
import CourseForm from "../components/courses-form";

const page = async () => {
  const faculties = (await getAllFaculties()).data?.documents;
  return <CourseForm faculties={faculties || []} />;
};

export default page;
