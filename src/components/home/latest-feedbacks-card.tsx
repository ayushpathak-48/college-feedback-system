import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedbackType } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export function LatestFeedbacksCard({
  feedbacks = [],
  className,
}: {
  feedbacks: FeedbackType[];
  className?: string;
}) {
  return (
    <Card className={cn("w-[380px]", className)}>
      <div className="flex items-center justify-between gap-4 w-full px-5">
        <CardHeader className="w-max px-0">
          <CardTitle>Latest 5 Feedbacks</CardTitle>
        </CardHeader>
        <Link href={"/feedbacks"}>
          <Button className="w-max">View all feedbacks</Button>
        </Link>
      </div>
      <CardContent className="grid gap-4">
        <Table>
          <TableCaption>A list of recent feedbacks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Faculty Name</TableHead>
              <TableHead className="whitespace-nowrap">
                Teaching Quality
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Communication Skills
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Student Engagement
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Subject Knowledge
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Punctuality and Discipline
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback.$id}>
                <TableCell className="font-medium whitespace-nowrap">
                  {feedback?.faculty.name}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn(
                          "cursor-pointer fill-transparent stroke-gray-400",
                          parseInt(feedback.teaching_quality) > i &&
                            "fill-yellow-500 stroke-yellow-500"
                        )}
                      />
                    ))}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn(
                          "cursor-pointer fill-transparent stroke-gray-400",
                          parseInt(feedback.communication_skills) > i &&
                            "fill-yellow-500 stroke-yellow-500"
                        )}
                      />
                    ))}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn(
                          "cursor-pointer fill-transparent stroke-gray-400",
                          parseInt(feedback.student_engagement) > i &&
                            "fill-yellow-500 stroke-yellow-500"
                        )}
                      />
                    ))}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn(
                          "cursor-pointer fill-transparent stroke-gray-400",
                          parseInt(feedback.subject_knowledge) > i &&
                            "fill-yellow-500 stroke-yellow-500"
                        )}
                      />
                    ))}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn(
                          "cursor-pointer fill-transparent stroke-gray-400",
                          parseInt(feedback.punctuality_and_discipline) > i &&
                            "fill-yellow-500 stroke-yellow-500"
                        )}
                      />
                    ))}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
