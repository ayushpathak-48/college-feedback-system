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
  faculty: FacultyType;
  total_semesters: number;
};

export type StudentType = Models.Document & {
  enrollment_id: string;
  email_id: string;
  name: string;
  gender: string;
  course: CoursesType;
  submittedFacultyMemberReviews: FacultyType[];
};

export type FeedbackType = Models.Document & {
  rating: number;
  comment: string;
  faculty: FacultyType;
};
