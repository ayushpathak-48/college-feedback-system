import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import { getAllFeedbacks } from "@/actions/admin.actions";
const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  if (!account.labels.includes("admin")) return redirect("/");
  const allFeedbacks = await getAllFeedbacks();
  console.log({ allFeedbacks });

  return (
    <div>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default Page;
