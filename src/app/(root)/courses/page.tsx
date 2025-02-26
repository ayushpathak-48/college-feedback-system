import { getAccount } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  return <div>Page</div>;
};

export default Page;
