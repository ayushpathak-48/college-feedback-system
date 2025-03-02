"use client";

import { deleteFacultyMember } from "@/actions/admin.actions";
import { CustomTooltip } from "@/components/custom-tooltip";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { FacultyMemberType } from "@/types";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const FacultyMemberTableActions = ({
  member,
}: {
  member: FacultyMemberType;
}) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    `Delete ${member.name}`,
    "This member will be removed permanently",
    "destructive"
  );

  const handleDeleteFacultyMember = async () => {
    const ok = await confirm();
    if (!ok) return;
    const loadingToast = toast.loading(
      "Please wait while deleting the faculty member..."
    );

    try {
      const response = await deleteFacultyMember(member.$id);
      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success("Faculty member deleted successfully");
        router.refresh();
      } else {
        toast.error(`Failed to delete member! Error:${response?.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error(`Failed to delete faculty member! Error:${error}`);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <ConfirmDialog />
      <CustomTooltip content="Edit" side="left">
        <Button variant={"outline"} asChild>
          <Link href={`/faculty-members/edit/${member.$id}`}>
            <PencilIcon />
          </Link>
        </Button>
      </CustomTooltip>
      <CustomTooltip content="Delete" side="right">
        <Button
          onClick={handleDeleteFacultyMember}
          variant={"outline"}
          className="text-red-500 border-red-200 hover:text-red-400"
        >
          <TrashIcon />
        </Button>
      </CustomTooltip>
    </div>
  );
};
