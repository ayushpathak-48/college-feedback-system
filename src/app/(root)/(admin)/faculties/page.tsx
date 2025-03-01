import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { getAllFaculties } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
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
