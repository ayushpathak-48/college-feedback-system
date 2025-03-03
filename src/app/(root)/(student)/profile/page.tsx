import React from "react";
import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import ProfileForm from "./components/profile-form";
import { DottedSeparator } from "@/components/DottedSeparator";
import ProfilePasswordUpdateForm from "./components/profile-password-update-form";

const page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  if (!account.labels.includes("student")) return redirect("/");

  return (
    <div className="flex flex-col gap-10">
      <ProfileForm student={account?.student} />
      <DottedSeparator className="py-5" />
      <ProfilePasswordUpdateForm />
    </div>
  );
};

export default page;
