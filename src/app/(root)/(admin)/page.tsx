import { getAccount } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";
import { ReportDataClient } from "./reports/components/report-data-client";
import { getAllFeedbacks } from "@/actions/admin.actions";

const page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }

  if (!account.labels.includes("admin")) return redirect("/submit-feedback");
  const feedbacks = (await getAllFeedbacks()).data?.documents;
  return (
    <div>
      <ReportDataClient feedbacks={feedbacks} />
      page
    </div>
  );
};

export default page;
