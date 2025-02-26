import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  return (
    <div>
      {" "}
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default Page;
