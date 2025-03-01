import React from "react";

import { redirect } from "next/navigation";
import { getAccount } from "@/actions/auth.action";
import { ReportCards } from "@/components/report-cards";

const Page = async () => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  if (!account.labels.includes("admin")) return redirect("/");
  return (
    <div className="h-[400px]">
      {/* <CustomAreaChart
        data={chartData}
        title="Monthly feedbacks"
        description="Feedbacks recieved every month"
      /> */}
      <ReportCards />
    </div>
  );
};

export default Page;
