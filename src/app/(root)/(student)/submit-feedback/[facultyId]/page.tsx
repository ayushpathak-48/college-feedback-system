/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import FeedbackForm from "@/components/feedback-form";
import { getAllFacultyMembers } from "@/actions/admin.actions";
const Page = async ({ params }: { params: any }) => {
  const account = await getAccount();
  const { facultyId } = await params;
  if (!account) {
    return redirect("/sign-in");
  }

  const facultyMembers = (
    await getAllFacultyMembers(account?.student?.course?.faculty?.$id)
  ).data?.documents;

  return (
    <div className="flex flex-col gap-2">
      <FeedbackForm
        facultyMembers={facultyMembers || []}
        facultyId={facultyId}
      />
    </div>
  );
};

export default Page;
