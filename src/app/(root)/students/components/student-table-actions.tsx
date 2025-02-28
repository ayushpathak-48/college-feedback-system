"use client";

import { deleteStudent } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { StudentType } from "@/types";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const StudentTableActions = ({ student }: { student: StudentType }) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    `Delete ${student.name}`,
    "This student will be removed permanently",
    "destructive"
  );

  const handleDeleteStudent = async () => {
    const ok = await confirm();
    if (!ok) return;
    const loadingToast = toast.loading(
      "Please wait while deleting the student..."
    );

    try {
      const response = await deleteStudent(student.$id);
      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success("Student deleted successfully");
        router.refresh();
      } else {
        toast.error(`Failed to delete student! Error:${response?.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error(`Failed to delete student! Error:${error}`);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <ConfirmDialog />
      <Button variant={"outline"} asChild>
        <Link href={`/students/edit/${student.$id}`}>
          Edit <PencilIcon />
        </Link>
      </Button>
      <Button
        onClick={handleDeleteStudent}
        variant={"outline"}
        className="text-red-500 border-red-200 hover:text-red-400"
      >
        Delete <TrashIcon />
      </Button>
    </div>
  );
};
