/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getAllFaculties, getFacultyMemberById } from "@/actions/admin.actions";
import EditFacultyMemberForm from "../../components/edit-faculty-member-form";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: any }) => {
  const { facultyMemberId } = await params;
  const faculties = (await getAllFaculties()).data?.documents;
  const member = (await getFacultyMemberById(facultyMemberId)).data;
  if (!member) {
    return redirect("/faculty-members");
  }

  return <EditFacultyMemberForm member={member} faculties={faculties || []} />;
};

export default page;
