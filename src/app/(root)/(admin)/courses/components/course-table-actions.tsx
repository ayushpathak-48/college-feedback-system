"use client";

import { deleteCourse } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { CoursesType } from "@/types";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const CourseTableActions = ({ course }: { course: CoursesType }) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    `Delete ${course.name}`,
    "This course will be removed permanently",
    "destructive"
  );

  const handleDeleteCourse = async () => {
    const ok = await confirm();
    if (!ok) return;
    const loadingToast = toast.loading(
      "Please wait while deleting the course..."
    );

    try {
      const response = await deleteCourse(course.$id);
      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success("Course deleted successfully");
        router.refresh();
      } else {
        toast.error(`Failed to delete course! Error:${response?.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error(`Failed to delete course! Error:${error}`);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <ConfirmDialog />
      <Button variant={"outline"} asChild>
        <Link href={`/courses/edit/${course.$id}`}>
          Edit <PencilIcon />
        </Link>
      </Button>
      <Button
        onClick={handleDeleteCourse}
        variant={"outline"}
        className="text-red-500 border-red-200 hover:text-red-400"
      >
        Delete <TrashIcon />
      </Button>
    </div>
  );
};
