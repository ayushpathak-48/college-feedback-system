import { FeedbackType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataStoreStates {
  feedbacks: FeedbackType[] | null;
  setFeedback: (value: FeedbackType[]) => void;
}

export const useDataStore = create<DataStoreStates>()(
  persist(
    (set, get) => ({
      feedbacks: get()?.feedbacks, // Default state
      setFeedback: (value) =>
        set({
          feedbacks: value,
        }),
    }),
    {
      name: "feedbacks", // Key for localStorage
    }
  )
);
