/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite/client";
import {
  EditFacultySchema,
  EditFacultySchemaType,
  FacultySchema,
  FacultySchemaType,
} from "@/schema/faculty.schema";

import { ID, Query } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import {
  CoursesType,
  FacultyMemberType,
  FacultyType,
  FeedbackType,
  StudentType,
} from "@/types";
import {
  EditFacultyMembersSchema,
  EditFacultyMembersSchemaType,
  FacultyMembersSchema,
  FacultyMembersSchemaType,
} from "@/schema/faculty-members.schema";
import {
  CourseSchema,
  CourseSchemaType,
  EditCourseSchema,
  EditCourseSchemaType,
} from "@/schema/course.schema";
import {
  EditStudentSchema,
  EditStudentSchemaType,
  StudentSchema,
  StudentSchemaType,
} from "@/schema/students.schema";
import { deleteAccount, getAccount, signUpAccount } from "./auth.action";
import { defaultStudentPassword } from "@/lib/constants";
import { FeedbackSchema, FeedbackSchemaType } from "@/schema/feedback.schema";
import { redirect } from "next/navigation";

// Get All Documents Common Function
export async function getAllDocuments<T>(
  collectionId: string,
  extraQueries: string[] = []
): Promise<{ documents: T[]; total: number }> {
  const allDocuments: T[] = [];
  let lastDocumentId = null;
  const limit = 100;

  while (true) {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
      ...extraQueries,
    ];
    if (lastDocumentId) {
      queries.push(Query.cursorAfter(lastDocumentId));
    }

    const { databases } = await createSessionClient();

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionId,
      queries
    );
    allDocuments.push(...(response.documents as T[]));

    if (response.documents.length < limit) break;

    lastDocumentId = response.documents[response.documents.length - 1].$id;
  }

  return { documents: allDocuments, total: allDocuments.length };
}

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
    const singleFaculty = await databases.getDocument<FacultyType>(
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

export async function updateFaculty(form: EditFacultySchemaType) {
  const parsedBody = EditFacultySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const { faculty_id, name } = parsedBody.data;

  try {
    const { databases } = await createSessionClient();
    const createdFaculty = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.facultiesCollectionId,
      faculty_id,
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

export async function deleteFaculty(id: string) {
  try {
    const { databases } = await createSessionClient();
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.facultiesCollectionId,
      id
    );

    return {
      success: true,
      message: "Faculty deleted Successfully",
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

export async function getFacultyMemberById(member_id: string = "") {
  try {
    const { databases } = await createSessionClient();
    const singleFaculty = await databases.getDocument<FacultyMemberType>(
      appwriteConfig.databaseId,
      appwriteConfig.facultyMembersCollectionId,
      member_id
    );
    return {
      success: true,
      message: "All faculty members",
      data: singleFaculty,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get faculty members",
      error,
    };
  }
}

export async function getAllFacultyMembers(faculty_id: string = "") {
  try {
    const queries = faculty_id ? [Query.equal("faculty", faculty_id)] : [];
    const allFacultyMembers = await getAllDocuments<FacultyMemberType>(
      appwriteConfig.facultyMembersCollectionId,
      queries
    );

    const data = await Promise.all(
      allFacultyMembers.documents.map(async (member) => {
        const totalFeedbacks = (
          await getAllDocuments<FeedbackType>(
            appwriteConfig.feedbacksCollectionId,
            [Query.equal("faculty", member.$id)]
          )
        ).total;
        return {
          ...member,
          totalFeedbacks,
        };
      })
    );

    return {
      success: true,
      message: "All faculty members",
      data: { documents: data, total: allFacultyMembers.total },
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

export async function updateFacultyMember(form: EditFacultyMembersSchemaType) {
  const parsedBody = EditFacultyMembersSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const { member_id, name, faculty_id } = parsedBody.data;

  try {
    const { databases } = await createSessionClient();
    const createdFaculty = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.facultyMembersCollectionId,
      member_id,
      {
        faculty: faculty_id,
        name,
      }
    );
    return {
      success: true,
      message: "Faculty member updated Successfully",
      data: createdFaculty,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update faculty member",
      error,
    };
  }
}

export async function deleteFacultyMember(id: string) {
  try {
    const { databases } = await createSessionClient();
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.facultyMembersCollectionId,
      id
    );

    return {
      success: true,
      message: "Faculty member deleted Successfully",
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
    const allCourses = await getAllDocuments<CoursesType>(
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

export async function getCourseById(id: string) {
  try {
    const { databases } = await createSessionClient();
    const singleCourse = await databases.getDocument<CoursesType>(
      appwriteConfig.databaseId,
      appwriteConfig.coursesCollectionId,
      id
    );

    return {
      success: true,
      message: "Single courses",
      data: singleCourse,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get single course",
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

export async function updateCourse(form: EditCourseSchemaType) {
  const parsedBody = EditCourseSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const { name, faculty_id, course_id, total_semesters } = parsedBody.data;

  try {
    const { databases } = await createSessionClient();
    const createdFaculty = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.coursesCollectionId,
      course_id,
      {
        faculty: faculty_id,
        name,
        total_semesters,
      }
    );
    return {
      success: true,
      message: "Faculty member updated Successfully",
      data: createdFaculty,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update faculty member",
      error,
    };
  }
}

export async function deleteCourse(id: string) {
  try {
    const { databases } = await createSessionClient();
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.coursesCollectionId,
      id
    );

    return {
      success: true,
      message: "Course deleted Successfully",
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

  const { name, gender, course_id, current_semester, email, enrollment_id } =
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

export async function updateStudent(form: EditStudentSchemaType) {
  const parsedBody = EditStudentSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }
  const {
    student_id,
    name,
    gender,
    course_id,
    current_semester,
    enrollment_id,
  } = parsedBody.data;

  try {
    const { databases } = await createSessionClient();

    const isEnrollmentAlreadyTaken = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId,
      [Query.equal("enrollment_id", enrollment_id)]
    );

    if (isEnrollmentAlreadyTaken.total > 0) {
      if (isEnrollmentAlreadyTaken.documents[0].$id != student_id) {
        return {
          success: false,
          message: "Failed to update student",
          error: "Enrollment Id is already taken",
        };
      }
    }

    const updatedStudent = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId,
      student_id,
      {
        name,
        course: course_id,
        current_semester: parseInt(current_semester),
        gender,
        enrollment_id,
      }
    );

    return {
      success: true,
      message: "Student updated Successfully",
      data: updatedStudent,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update student",
      error,
    };
  }
}

export async function getAllStudents() {
  try {
    const allStudents = await getAllDocuments<StudentType>(
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

export async function getStudentById(id: string) {
  try {
    const { databases } = await createSessionClient();
    const singleStudent = await databases.getDocument<StudentType>(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId,
      id
    );

    return {
      success: true,
      message: "Single student",
      data: singleStudent,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get single student",
      error,
    };
  }
}

export async function getStudentByEmail(email: string) {
  try {
    const { databases } = await createSessionClient();
    const singleFaculty = await databases.listDocuments<StudentType>(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId,
      [Query.equal("email_id", email)]
    );
    return {
      success: true,
      message: "Single student by email",
      data: singleFaculty.documents[0],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get Single student",
      error,
    };
  }
}

export async function updateStudentFeedbackList(faculty_id: string) {
  try {
    const { databases } = await createSessionClient();
    const account = await getAccount();

    if (!account || !account.student) {
      return {
        success: false,
        message: "You are not authorized for this action",
      };
    }
    const alreadySubmitted = account.student.submittedFacultyMemberReviews.find(
      ({ $id }) => $id == faculty_id
    );

    if (alreadySubmitted && alreadySubmitted.$id) {
      return redirect("/submit-feedback");
    }

    const submittedFacultyMemberReveiewIds =
      account.student.submittedFacultyMemberReviews.map(({ $id }) => $id);

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId,
      account.student.$id,
      {
        submittedFacultyMemberReviews: [
          faculty_id,
          ...submittedFacultyMemberReveiewIds,
        ],
      }
    );
    return {
      success: true,
      message: "Updated feedback list in students collection",
    };
  } catch (error) {
    console.log({ error });
    return {
      success: false,
      message: "Failed to updated feedback list in students collection",
      error,
    };
  }
}

export async function deleteStudent(id: string) {
  try {
    const { databases } = await createSessionClient();
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.studentsCollectionId,
      id
    );

    return {
      success: true,
      message: "Student deleted Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add student",
      error,
    };
  }
}

// Feedback Actions

export async function addNewFeedback(form: FeedbackSchemaType) {
  const parsedBody = FeedbackSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const {
    faculty_id,
    comment,
    communication_skills,
    punctuality_and_discipline,
    student_engagement,
    subject_knowledge,
    teaching_quality,
  } = parsedBody.data;

  try {
    const { databases } = await createSessionClient();
    const createdFeedback = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedbacksCollectionId,
      ID.unique(),
      {
        faculty: faculty_id,
        comment,
        communication_skills,
        punctuality_and_discipline,
        student_engagement,
        subject_knowledge,
        teaching_quality,
      }
    );

    const updatedStudentFeedbackList = await updateStudentFeedbackList(
      faculty_id
    );

    if (!updatedStudentFeedbackList.success) {
      await deleteFeedback(createdFeedback.$id);
      return {
        success: false,
        message: "Failed to submit feedback",
        error: updatedStudentFeedbackList.error,
      };
    }

    return {
      success: true,
      message: "Feedback added Successfully",
      data: createdFeedback,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to submit feedback",
      error,
    };
  }
}

export async function deleteFeedback(id: string) {
  try {
    const { databases } = await createSessionClient();
    const deletedFeedback = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedbacksCollectionId,
      id
    );

    return {
      success: true,
      message: "Feedback deleted Successfully",
      data: deletedFeedback,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add feedback",
      error,
    };
  }
}

export async function getAllFeedbacks() {
  try {
    const allFeedbacks = await getAllDocuments<FeedbackType>(
      appwriteConfig.feedbacksCollectionId
    );

    return {
      success: true,
      message: "All feedbacks",
      data: allFeedbacks,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get feedbacks",
      error,
    };
  }
}

export async function toggleFeedback(
  collectionId: string,
  documentId: string,
  value: boolean
) {
  try {
    const { databases } = await createSessionClient();
    const toggled = await databases.updateDocument(
      appwriteConfig.databaseId,
      collectionId,
      documentId,
      {
        accepting_feedback: value,
      }
    );

    return {
      success: true,
      message: "Feedback toggled Successfully",
      data: toggled,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to toggle feedback",
      error,
    };
  }
}
