/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentType } from "@/types";
import { Models } from "node-appwrite";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStoreStates {
  user: (Models.User<any> & { student: StudentType | undefined }) | null;
  setUser: (
    value: Models.User<any> & { student: StudentType | undefined }
  ) => void;
}

export const useUserStore = create<UserStoreStates>()(
  persist(
    (set, get) => ({
      user: get()?.user, // Default state
      setUser: (value) => set({ user: value }),
    }),
    {
      name: "currentUser", // Key for localStorage
    }
  )
);
