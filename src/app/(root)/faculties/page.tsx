import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import { getAllFaculties } from "@/actions/admin.actions";

const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  const facultiesData = (await getAllFaculties()).data?.documents;

  return (
    <div>
      <DataTable columns={columns} data={facultiesData ?? []} />
    </div>
  );
};

export default Page;
