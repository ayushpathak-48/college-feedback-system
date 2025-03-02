import { FeedbackType } from "@/types";
import { create } from "zustand";

interface DataStoreStates {
  feedbacks: FeedbackType[] | null;
  setFeedback: (value: FeedbackType[]) => void;
}

export const useDataStore = create<DataStoreStates>((set, get) => ({
  feedbacks: get()?.feedbacks, // Default state
  setFeedback: (value) =>
    set({
      feedbacks: value,
    }),
}));
