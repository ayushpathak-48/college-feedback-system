"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CoursesType } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, toggleAcceptingFeedback } from "@/lib/utils";
import { CourseTableActions } from "./course-table-actions";
import { Switch } from "@/components/ui/switch";

export const columns: ColumnDef<CoursesType>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row?.original?.name;
      return (
        <div>
          <span className={cn("truncate")}>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "faculty.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Faculty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const facultyName = row?.original?.faculty?.name;
      return (
        <div>
          <span className={cn("truncate")}>{facultyName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "accepting_feedback",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Accepting Feedback
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const course = row?.original;
      return (
        <div className="flex items-center justify-center w-full">
          <Switch
            defaultChecked={course.accepting_feedback}
            onCheckedChange={async () => {
              const isToggled = await toggleAcceptingFeedback(
                "course",
                course.$id,
                !course.accepting_feedback
              );
              if (!isToggled) {
              }
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <CourseTableActions course={row.original} />;
    },
  },
];
