import React from "react";

import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import { getAllFacultyMembers } from "@/actions/admin.actions";
import { FacultyMemberCard } from "./components/faculty-member-card";
const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }

  const facultyMembers = (
    await getAllFacultyMembers(account?.student?.course?.faculty?.$id)
  ).data?.documents;

  return (
    <div className="flex flex-col gap-2">
      {facultyMembers?.map((member) => (
        <FacultyMemberCard member={member} key={member.$id} />
      ))}
    </div>
  );
};

export default Page;
