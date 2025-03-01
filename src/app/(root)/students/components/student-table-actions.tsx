"use client";

import { deleteStudent } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { StudentType } from "@/types";
import { LoaderIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export const StudentTableActions = ({ student }: { student: StudentType }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    `Delete ${student.name}`,
    "This student will be removed permanently",
    "destructive"
  );

  const handleDeleteStudent = async () => {
    const ok = await confirm();
    if (!ok) return;
    setIsDeleting(true);
    const loadingToast = toast.loading(
      "Please wait while deleting the student..."
    );

    try {
      console.log({ student });
      const response = await deleteStudent(student.$id, student.accountId);
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
    setIsDeleting(false);
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
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <LoaderIcon className="animate-spin" /> Deleting...{" "}
          </>
        ) : (
          <>
            Delete <TrashIcon />
          </>
        )}
      </Button>
    </div>
  );
};
