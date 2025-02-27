"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite/client";
import { FacultySchema, FacultySchemaType } from "@/schema/faculty.schema";

import { ID, Query } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import {
  CoursesType,
  FacultyMemberType,
  FacultyType,
  StudentType,
} from "@/types";
import {
  FacultyMembersSchema,
  FacultyMembersSchemaType,
} from "@/schema/faculty-members.schema";
import { CourseSchema, CourseSchemaType } from "@/schema/course.schema";
import { StudentSchema, StudentSchemaType } from "@/schema/students.schema";
import { deleteAccount, signUpAccount } from "./auth.action";
import { defaultStudentPassword } from "@/lib/constants";

// Faculty Actions
export async function getAllFaculties() {
  try {
    const { databases } = await createSessionClient();
    const allFaculties = await databases.listDocuments<FacultyType>(
      appwriteConfig.databaseId,
      appwriteConfig.facultiesCollectionId
    );
    return {
      success: true,
      message: "All faculties",
      data: allFaculties,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get faculties",
      error,
    };
  }
}

export async function getFacultyById(id: string) {
  try {
    const { databases } = await createSessionClient();
    const singleFaculty = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.facultiesCollectionId,
      id
    );
    return {
      success: true,
      message: "Single Faculty By Id",
      data: singleFaculty,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get Single Faculty",
      error,
    };
  }
}

export async function addNewFaculty(form: FacultySchemaType) {
  const parsedBody = FacultySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const { name } = parsedBody.data;

  try {
    const { databases } = await createSessionClient();
    const createdFaculty = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.facultiesCollectionId,
      ID.unique(),
      {
        name,
      }
    );
    return {
      success: true,
      message: "Faculty added Successfully",
      data: createdFaculty,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add faculty",
      error,
    };
  }
}

// Faculty Member Actions
export async function getAllFacultyMembers() {
  try {
    const { databases } = await createSessionClient();
    const allFacultyMembers = await databases.listDocuments<FacultyMemberType>(
      appwriteConfig.databaseId,
      appwriteConfig.facultyMembersCollectionId
    );
    return {
      success: true,
      message: "All faculty members",
      data: allFacultyMembers,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get faculty members",
      error,
    };
  }
}

export async function addNewFacultymember(form: FacultyMembersSchemaType) {
  const parsedBody = FacultyMembersSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const { name, faculty_id } = parsedBody.data;

  try {
    const { databases } = await createSessionClient();
    const createdFaculty = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.facultyMembersCollectionId,
      ID.unique(),
      {
        faculty: faculty_id,
        name,
      }
    );
    return {
      success: true,
      message: "Faculty member added Successfully",
      data: createdFaculty,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add faculty member",
      error,
    };
  }
}

// Courses Actions
export async function getAllCourses() {
  try {
    const { databases } = await createSessionClient();
    const allCourses = await databases.listDocuments<CoursesType>(
      appwriteConfig.databaseId,
      appwriteConfig.coursesCollectionId
    );
    return {
      success: true,
      message: "All courses",
      data: allCourses,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get courses",
      error,
    };
  }
}

export async function addNewCourse(form: CourseSchemaType) {
  const parsedBody = CourseSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const { name, faculty_id, total_semesters } = parsedBody.data;

  try {
    const { databases } = await createSessionClient();
    const createdCourse = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.coursesCollectionId,
      ID.unique(),
      {
        faculty: faculty_id,
        name,
        total_semesters: parseInt(total_semesters),
      }
    );
    return {
      success: true,
      message: "Course added Successfully",
      data: createdCourse,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add course",
      error,
    };
  }
}

// Students Actions
export async function getAllStudents() {
  try {
    const { databases } = await createSessionClient();
    const allStudents = await databases.listDocuments<StudentType>(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId
    );

    return {
      success: true,
      message: "All Students",
      data: allStudents,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get students",
      error,
    };
  }
}

export async function addNewStudent(form: StudentSchemaType) {
  const parsedBody = StudentSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const studentAccount = await signUpAccount({
    name: form.name,
    email: form.email,
    password: defaultStudentPassword,
  });

  if (!studentAccount.success || !studentAccount.data) {
    return {
      success: false,
      message: "Failed to add student",
      error: studentAccount.error,
    };
  }

  const { users } = await createAdminClient();
  await users.updateLabels(studentAccount.data.$id, ["student"]);

  const { gender, course_id, current_semester, email, enrollment_id } =
    parsedBody.data;

  try {
    const { databases } = await createSessionClient();

    const isEnrollmentAlreadyTaken = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId,
      [Query.equal("enrollment_id", enrollment_id)]
    );

    if (isEnrollmentAlreadyTaken.total > 0) {
      await deleteAccount(studentAccount.data.$id);
      return {
        success: false,
        message: "Failed to add student",
        error: "Enrollment Id is already taken",
      };
    }

    const createdStudent = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId,
      ID.unique(),
      {
        name,
        course: course_id,
        current_semester: parseInt(current_semester),
        email_id: email,
        gender,
        enrollment_id,
      }
    );
    return {
      success: true,
      message: "Student added Successfully",
      data: createdStudent,
    };
  } catch (error) {
    await deleteAccount(studentAccount.data.$id);
    return {
      success: false,
      message: "Failed to add student",
      error,
    };
  }
}
