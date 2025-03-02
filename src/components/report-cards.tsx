import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";

export const ReportCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <Link href={"/reports/category"}>
        <Card className="w-full">
          <CardContent className="p-0 m-0 ">
            <Image
              src={"/report-1.png"}
              height={200}
              width={300}
              alt="Faculty Feedback Reports"
              className="object-cover h-[200px] w-full rounded-xl"
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Categorized Report</CardTitle>
            <CardDescription>
              Analyze feedbacks according to the Teaching Quality, Communication
              Skills, Student Engagement, Subject Knowledge, Punctuality and
              Discipline
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href={"/reports/faculty-members"}>
        <Card className="w-full">
          <CardContent className="p-0 m-0 flex items-center justify-center overflow-hidden">
            <Image
              src={"/report-2.png"}
              height={200}
              width={300}
              alt="Faculty Feedback Reports"
              className="object-contain h-[200px] rounded-xl"
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Single Faculty Report</CardTitle>
            <CardDescription>
              Analyze feedbacks for every faculty member
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};
