/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataTable } from "@/components/data-table";
import { columns } from "@/app/(root)/(admin)/feedbacks/components/columns";
import React from "react";
import { getAllFeedbacks } from "@/actions/admin.actions";
import { Query } from "node-appwrite";
const Page = async ({ params }: { params: any }) => {
  const { facultyId } = await params;
  const queries = [Query.equal("faculty", facultyId)];
  const allFeedbacks = (await getAllFeedbacks(queries)).data?.documents;
  return (
    <div>
      <DataTable
        columns={columns}
        data={allFeedbacks || []}
        showFeedbackFilters
      />
    </div>
  );
};

export default Page;
