"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StudentType } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudentTableActions } from "./student-table-actions";

export const columns: ColumnDef<StudentType>[] = [
  {
    accessorKey: "enrollment_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enrollment Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="line-clamp-1">{row?.original?.enrollment_id}</p>;
    },
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
    accessorKey: "email_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email_id = row?.original?.email_id;
      return (
        <div>
          <span className={cn("truncate")}>{email_id}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const gender = row?.original?.gender;
      return (
        <div className="flex items-center justify-center">
          <span className={cn("truncate capitalize")}>
            {gender.toLowerCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "course",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course & Faculty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const course = row?.original?.course;
      return (
        <div className="flex flex-col gap-1">
          <span className={cn("truncate text-xs")}>
            <span className="font-semibold">Faculty</span>:{" "}
            {course.faculty.name}
          </span>
          <span className={cn("truncate text-xs")}>
            <span className="font-semibold">Course</span>: {course.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "current_semester",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sem
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const current_semester = row?.original?.current_semester;
      return (
        <div className="flex items-center justify-center">
          <span className={cn("truncate")}>{current_semester}</span>
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
      return <StudentTableActions student={row.original} />;
    },
  },
];
