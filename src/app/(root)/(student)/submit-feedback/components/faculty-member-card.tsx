"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user.store";
import { FacultyMemberType } from "@/types";
import Link from "next/link";
import React from "react";

export const FacultyMemberCard = ({
  member,
}: {
  member: FacultyMemberType;
}) => {
  const user = useUserStore((state) => state.user);
  const isAlreadySubmitted = user?.student?.submittedFacultyMemberReviews.some(
    ({ $id }: { $id: string }) => member.$id == $id
  );
  return (
    <Link
      href={`${isAlreadySubmitted ? "" : `submit-feedback/${member.$id}`}`}
      key={member.$id}
      className="flex items-center justify-between gap-5 border rounded-md p-2 px-4"
    >
      <div className="font-medium text-lg">{member.name}</div>
      {isAlreadySubmitted ? (
        <Button variant={"ghost"} disabled>
          Feedback Already Submitted
        </Button>
      ) : (
        <Button variant={"outline"}>Submit Feedback</Button>
      )}
    </Link>
  );
};
