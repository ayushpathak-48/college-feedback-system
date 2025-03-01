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
    <div className="flex items-center gap-4">
      <Link href={"/reports/faculty-members"}>
        <Card>
          <CardContent>
            <Image
              src={""}
              height={200}
              width={300}
              alt="Faculty Feedback Reports"
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Faculty member feedback reports</CardTitle>
            <CardDescription>
              Analyze feedbacks according to the faculty member
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};
