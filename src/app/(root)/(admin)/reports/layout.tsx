import { getAllFeedbacks } from "@/actions/admin.actions";
import React, { PropsWithChildren } from "react";
import { ReportDataClient } from "./components/report-data-client";

const layout = async ({ children }: PropsWithChildren) => {
  const feedbacks = (await getAllFeedbacks()).data?.documents;
  return (
    <>
      <ReportDataClient feedbacks={feedbacks} />
      {children}
    </>
  );
};

export default layout;
