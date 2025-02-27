import { Models } from "node-appwrite";

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export type FacultyType = Models.Document & {
  name: string;
};

export type FacultyMemberType = Models.Document & {
  faculty: string;
  name: string;
};

export type CoursesType = Models.Document & {
  name: string;
  faculty: string;
  total_semesters: number;
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
