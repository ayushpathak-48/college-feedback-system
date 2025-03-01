"use client";

import { deleteFaculty } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { FacultyType } from "@/types";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const FacultyTableActions = ({ faculty }: { faculty: FacultyType }) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    `Delete ${faculty.name}`,
    "This faculty will be removed permanently",
    "destructive"
  );

  const handleDeleteFaculty = async () => {
    const ok = await confirm();
    if (!ok) return;
    const loadingToast = toast.loading(
      "Please wait while deleting the faculty..."
    );

    try {
      const response = await deleteFaculty(faculty.$id);
      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success("Faculty deleted successfully");
        router.refresh();
      } else {
        toast.error(`Failed to delete! Error:${response?.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error(`Failed to delete faculty! Error:${error}`);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <ConfirmDialog />
      <Button variant={"outline"} asChild>
        <Link href={`/faculties/edit/${faculty.$id}`}>
          Edit <PencilIcon />
        </Link>
      </Button>
      <Button
        onClick={handleDeleteFaculty}
        variant={"outline"}
        className="text-red-500 border-red-200 hover:text-red-400"
      >
        Delete <TrashIcon />
      </Button>
    </div>
  );
};
