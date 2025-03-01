import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllStudents } from "@/actions/admin.actions";
const Page = async () => {
  const data = (await getAllStudents()).data?.documents;
  return (
    <div>
      <DataTable
        columns={columns}
        data={data || []}
        headerButton={
          <Button asChild>
            <Link href={"/students/new"}>Add Student</Link>
          </Button>
        }
      />
    </div>
  );
};

export default Page;
