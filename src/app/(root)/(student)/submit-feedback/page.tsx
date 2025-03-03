import React from "react";

import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import { getAllFacultyMembers } from "@/actions/admin.actions";
import { FacultyMemberCard } from "./components/faculty-member-card";
import { MessageCircleOffIcon } from "lucide-react";
const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  if (!account.labels.includes("student")) return redirect("/submit-feedback");

  const isAcceptingFeedback = account?.student?.course?.accepting_feedback;
  const facultyMembers = isAcceptingFeedback
    ? (await getAllFacultyMembers(account?.student?.course?.faculty?.$id)).data
        ?.documents
    : [];

  return (
    <div className="flex flex-col gap-2 h-screen">
      {isAcceptingFeedback ? (
        <>
          {facultyMembers?.map((member) => (
            <FacultyMemberCard member={member} key={member.$id} />
          ))}
        </>
      ) : (
        <div className="h-2/3 flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center gap-2 rounded max-w-xl w-full m-auto h-max">
            <MessageCircleOffIcon className="size-20 text-primary/70" />
            <div className="mt-4 text-2xl font-medium">Feedback Locked</div>
            <div className="text-gray-400">
              We are currently not accepting feedback
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
