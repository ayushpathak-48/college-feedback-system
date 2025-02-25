import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
const Page = () => {
  return (
    <div>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default Page;
