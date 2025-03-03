"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FacultyMemberType } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FacultyMemberTableActions } from "./faculty-member-table-actions";
import Link from "next/link";
import { CustomTooltip } from "@/components/custom-tooltip";

export const columns: ColumnDef<FacultyMemberType>[] = [
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
    accessorKey: "totalFeedbacks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="m-0 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Feedbacks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalFeedbacks = row?.original?.totalFeedbacks;
      return (
        <div>
          <span className={cn("truncate")}>
            {totalFeedbacks == 0 ? (
              <span className="text-gray-400">No Feedbacks</span>
            ) : (
              <CustomTooltip content={`View feedbacks of ${row.original.name}`}>
                <Button variant={"outline"} asChild>
                  <Link href={`/faculty-members/feedbacks/${row.original.$id}`}>
                    {totalFeedbacks} feedback{totalFeedbacks > 1 ? "s" : ""}
                  </Link>
                </Button>
              </CustomTooltip>
            )}
          </span>
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
      return <FacultyMemberTableActions member={row?.original} />;
    },
  },
];
