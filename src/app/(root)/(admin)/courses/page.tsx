import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllCourses } from "@/actions/admin.actions";
const Page = async () => {
  const data = (await getAllCourses()).data?.documents;
  return (
    <div>
      <DataTable
        columns={columns}
        data={data || []}
        headerButton={
          <Button asChild>
            <Link href={"/courses/new"}>Add Course</Link>
          </Button>
        }
      />
    </div>
  );
};

export default Page;
