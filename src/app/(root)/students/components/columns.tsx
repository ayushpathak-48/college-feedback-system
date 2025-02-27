"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FeedbackType } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<FeedbackType>[] = [
  {
    accessorKey: "enrollment_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enrollment Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="line-clamp-1">{row.original.enrollment_id}</p>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email_id = row.original.email_id;
      return (
        <div>
          <span className={cn("truncate")}>{email_id}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "division",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Division
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const division = row.original.division;
      return (
        <div>
          <span className={cn("truncate")}>{division}</span>
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sem
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const current_semester = row.original.current_semester;
      return (
        <div>
          <span className={cn("truncate")}>{current_semester}</span>
        </div>
      );
    },
  },
];
