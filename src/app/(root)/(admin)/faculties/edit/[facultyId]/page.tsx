/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getFacultyById } from "@/actions/admin.actions";
import { redirect } from "next/navigation";
import EditFacultyForm from "../../components/edit-faculty-form";

const page = async ({ params }: { params: any }) => {
  const { facultyId } = await params;
  const faculty = (await getFacultyById(facultyId)).data;
  if (!faculty) {
    return redirect("/faculties");
  }

  return <EditFacultyForm faculty={faculty} />;
};

export default page;
