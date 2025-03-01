import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllFacultyMembers } from "@/actions/admin.actions";
const Page = async () => {
  const data = (await getAllFacultyMembers()).data?.documents;
  return (
    <div>
      <DataTable
        columns={columns}
        data={data || []}
        headerButton={
          <Button asChild>
            <Link href={"/faculty-members/new"}>Add Faculty Member</Link>
          </Button>
        }
      />
    </div>
  );
};

export default Page;
