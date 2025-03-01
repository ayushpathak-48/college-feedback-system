import { Models } from "node-appwrite";

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export type FacultyType = Models.Document & {
  name: string;
  totalFeedbacks: number;
};

export type FacultyMemberType = Models.Document & {
  faculty: FacultyType;
  name: string;
};

export type CoursesType = Models.Document & {
  name: string;
  faculty: FacultyType;
  total_semesters: number;
  accepting_feedback: boolean;
};

export type StudentType = Models.Document & {
  enrollment_id: string;
  email_id: string;
  name: string;
  gender: string;
  current_semester: string;
  course: CoursesType;
  submittedFacultyMemberReviews: FacultyType[];
  accountId: string;
};

export type FeedbackType = Models.Document & {
  teaching_quality: string;
  communication_skills: string;
  subject_knowledge: string;
  student_engagement: string;
  punctuality_and_discipline: string;
  comment: string;
  faculty: FacultyMemberType;
};

export type ToggleFeedbackTypes = "course" | "faculty";
