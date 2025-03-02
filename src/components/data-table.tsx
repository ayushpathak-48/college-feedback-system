/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DataTableFacetedFilter } from "./faced-filter";
import { DownloadIcon, FilterIcon } from "lucide-react";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  headerButton?: ReactNode;
  showFeedbackFilters?: boolean;
  hideSearch?: boolean;
  headerTitle?: string;
}

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "feedback-report",
});

export function DataTable<TData, TValue>({
  columns,
  data,
  headerButton,
  showFeedbackFilters,
  hideSearch = false,
  headerTitle = "",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleExportCSV = (data: any) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  return (
    <div>
      <div className="flex items-center py-4 justify-between flex-wrap gap-2">
        {headerTitle && (
          <div className="text-lg font-medium w-max">{headerTitle}</div>
        )}
        {!hideSearch && (
          <Input
            placeholder="Search..."
            value={(table?.getState().globalFilter as string) ?? ""}
            onChange={(event) => table?.setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
        )}
        {headerButton ? headerButton : <></>}
        {showFeedbackFilters && (
          <div
            className={cn(
              "flex items-center gap-2",
              hideSearch && "justify-between"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto h-8 flex"
                >
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300]">
                <DropdownMenuLabel>Filter columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table.getColumn("teaching_quality") ? (
                  <DataTableFacetedFilter
                    triggerClass="border-0 w-full m-0 rounded-none justify-start"
                    title="Teaching Quality"
                    column={table.getColumn("teaching_quality")}
                    options={[
                      { label: "1 Star", value: "1" },
                      { label: "2 Stars", value: "2" },
                      { label: "3 Stars", value: "3" },
                      { label: "4 Stars", value: "4" },
                      { label: "5 Stars", value: "5" },
                    ]}
                  />
                ) : (
                  <></>
                )}
                {table.getColumn("communication_skills") ? (
                  <DataTableFacetedFilter
                    triggerClass="border-0 w-full m-0 rounded-none justify-start"
                    title="Communication Skills"
                    column={table.getColumn("communication_skills")}
                    options={[
                      { label: "1 Star", value: "1" },
                      { label: "2 Stars", value: "2" },
                      { label: "3 Stars", value: "3" },
                      { label: "4 Stars", value: "4" },
                      { label: "5 Stars", value: "5" },
                    ]}
                  />
                ) : (
                  <></>
                )}
                {table.getColumn("student_engagement") ? (
                  <DataTableFacetedFilter
                    triggerClass="border-0 w-full m-0 rounded-none justify-start"
                    title="Student Engagement"
                    column={table.getColumn("student_engagement")}
                    options={[
                      { label: "1 Star", value: "1" },
                      { label: "2 Stars", value: "2" },
                      { label: "3 Stars", value: "3" },
                      { label: "4 Stars", value: "4" },
                      { label: "5 Stars", value: "5" },
                    ]}
                  />
                ) : (
                  <></>
                )}
                {table.getColumn("punctuality_and_discipline") ? (
                  <DataTableFacetedFilter
                    triggerClass="border-0 w-full m-0 rounded-none justify-start"
                    title="Punctuality & Discipline"
                    column={table.getColumn("punctuality_and_discipline")}
                    options={[
                      { label: "1 Star", value: "1" },
                      { label: "2 Stars", value: "2" },
                      { label: "3 Stars", value: "3" },
                      { label: "4 Stars", value: "4" },
                      { label: "5 Stars", value: "5" },
                    ]}
                  />
                ) : (
                  <></>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant={"outline"}
              size={"sm"}
              className="ml-0 h-8 w-max justify-start"
              onClick={() => {
                const data: any = table
                  .getFilteredRowModel()
                  .rows.map(({ original, index }: any) => ({
                    Id: index + 1,
                    "Faculty Member": original?.faculty?.name,
                    Comment: original?.comment,
                    "Teaching Quality": original?.teaching_quality,
                    "Communication Skills": original?.communication_skills,
                    "Subject Knowledge": original?.subject_knowledge,
                    "Student Engagement": original?.student_engagement,
                    "Punctuality and Discipline":
                      original?.punctuality_and_discipline,
                    "Submitted On": format(original?.$createdAt, "PPP"),
                  }));
                handleExportCSV(data);
              }}
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="px-5" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="px-5" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
