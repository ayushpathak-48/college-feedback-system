import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import React from "react";
import { getAllFeedbacks } from "@/actions/admin.actions";
const Page = async () => {
  const allFeedbacks = (await getAllFeedbacks()).data?.documents;
  return (
    <div>
      <DataTable
        columns={columns}
        data={allFeedbacks || []}
        showFeedbackFilters
        headerTitle={`All Feedbacks`}
        hideSearch
      />
    </div>
  );
};

export default Page;
