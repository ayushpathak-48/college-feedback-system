"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FeedbackType } from "@/types";
import { ArrowUpDown, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const columns: ColumnDef<FeedbackType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="line-clamp-1">{row.index + 1}</p>;
    },
    sortingFn: (rowA, rowB) => rowA.index - rowB.index,
  },
  {
    accessorKey: "faculty_member_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Faculty Member
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const faculty = row.original.faculty;
      return (
        <div>
          <span className={cn("truncate")}>{faculty?.name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "comment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const comment = row?.original?.comment;
      return (
        <div>
          <span className={cn("truncate")}>{comment}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "teaching_quality",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teaching Quality
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const teaching_quality = row?.original?.teaching_quality;
      return (
        <div>
          <span className={cn("truncate flex items-center gap-1")}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "cursor-pointer fill-transparent stroke-gray-400",
                  parseInt(teaching_quality) > i &&
                    "fill-yellow-500 stroke-yellow-500"
                )}
              />
            ))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "communication_skills",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Communication Skills
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const communication_skills = row?.original?.communication_skills;
      return (
        <div>
          <span className={cn("truncate flex items-center gap-1")}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "cursor-pointer fill-transparent stroke-gray-400",
                  parseInt(communication_skills) > i &&
                    "fill-yellow-500 stroke-yellow-500"
                )}
              />
            ))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "subject_knowledge",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject Knowledge
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const subject_knowledge = row?.original?.subject_knowledge;
      return (
        <div>
          <span className={cn("truncate flex items-center gap-1")}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "cursor-pointer fill-transparent stroke-gray-400",
                  parseInt(subject_knowledge) > i &&
                    "fill-yellow-500 stroke-yellow-500"
                )}
              />
            ))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "student_engagement",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Engagement
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const student_engagement = row?.original?.student_engagement;
      return (
        <div>
          <span className={cn("truncate flex items-center gap-1")}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "cursor-pointer fill-transparent stroke-gray-400",
                  parseInt(student_engagement) > i &&
                    "fill-yellow-500 stroke-yellow-500"
                )}
              />
            ))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "punctuality_and_discipline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Punctuality and Discipline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const punctuality_and_discipline =
        row?.original?.punctuality_and_discipline;
      return (
        <div>
          <span className={cn("truncate flex items-center gap-1")}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "cursor-pointer fill-transparent stroke-gray-400",
                  parseInt(punctuality_and_discipline) > i &&
                    "fill-yellow-500 stroke-yellow-500"
                )}
              />
            ))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "faculty_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Faculty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const faculty = row.original.faculty;
      return (
        <div>
          <span className={cn("truncate")}>{faculty?.faculty?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted on
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row?.original?.$createdAt;
      return (
        <div>
          <span className={cn("truncate")}>{format(createdAt, "PPP")}</span>
        </div>
      );
    },
  },
];
