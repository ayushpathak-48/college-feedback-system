import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import { getAllFaculties } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  if (!account.labels.includes("admin")) return redirect("/");

  const facultiesData = (await getAllFaculties()).data?.documents;

  return (
    <div>
      <DataTable
        columns={columns}
        data={facultiesData ?? []}
        headerButton={
          <Button asChild>
            <Link href={"/faculties/new"}>Add Faculty</Link>
          </Button>
        }
      />
    </div>
  );
};

export default Page;
