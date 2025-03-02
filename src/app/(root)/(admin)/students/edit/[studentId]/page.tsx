/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import EditStudentForm from "../../components/edit-student-form";
import { getAllCourses, getStudentById } from "@/actions/admin.actions";
import UpdatePasswordForm from "../../components/update-password-form";

const page = async ({ params }: { params: any }) => {
  const { studentId } = await params;

  const account = await getAccount();
  if (!account) return redirect("/sign-in");

  const data = (await getAllCourses()).data?.documents;

  const student = (await getStudentById(studentId)).data;
  if (!student) return redirect("/students");

  return (
    <div className="flex flex-col gap-10">
      <EditStudentForm student={student} courses={data || []} />
      <UpdatePasswordForm student={student} />
    </div>
  );
};

export default page;
