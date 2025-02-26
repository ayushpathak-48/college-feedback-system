import { Models } from "node-appwrite";

export type FacultyType = Models.Document & {
  name: string;
};

export type FacultyMemberType = Models.Document & {
  facullty_id: string;
  name: string;
};

export type StudentType = Models.Document & {
  email: string;
  name: string;
  division: string;
  stream: string;
};

export type FeedbackType = Models.Document & {
  rating: number;
  comment: string;
  faculty: FacultyType;
};
