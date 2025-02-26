import React from "react";

import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  return <div>Page</div>;
};

export default Page;
