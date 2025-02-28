import { toggleFeedback } from "@/actions/admin.actions";
import { ToggleFeedbackTypes } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { appwriteConfig } from "./appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function toggleAcceptingFeedback(
  type: ToggleFeedbackTypes,
  id: string,
  value: boolean
) {
  const toggleCollectionsMap = {
    course: appwriteConfig.coursesCollectionId,
    faculty: appwriteConfig.facultiesCollectionId,
  };
  const collection = toggleCollectionsMap[type];
  const loadingToast = toast.loading(`Please wait...`);
  const isToggled = await toggleFeedback(collection, id, value);
  toast.dismiss(loadingToast);
  if (isToggled.success) {
    toast.success("Feedback toggled successfully");
  } else {
    toast.error("Failed to toggle feedback");
  }
  return isToggled.success;
}
