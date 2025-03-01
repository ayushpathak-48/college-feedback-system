/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import EditStudentForm from "../../components/edit-student-form";
import { getAllCourses, getStudentById } from "@/actions/admin.actions";

const page = async ({ params }: { params: any }) => {
  const { studentId } = await params;

  const account = await getAccount();
  if (!account) return redirect("/sign-in");

  const data = (await getAllCourses()).data?.documents;

  const student = (await getStudentById(studentId)).data;
  if (!student) return redirect("/students");

  return <EditStudentForm student={student} courses={data || []} />;
};

export default page;
