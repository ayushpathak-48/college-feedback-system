export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_URL!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  apiSecret: process.env.APPWRITE_API_SECRET!,
  facultiesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_FACULTIES_COLLECTION_ID!,
  facultyMembersCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_FACULTY_MEMBERS_COLLECTION_ID!,
  coursesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
  studentsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID!,
  feedbacksCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_FEEDBACKS_COLLECTION_ID!,
  feedbackSettingsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_SETTINGS_COLLECTION_ID!,
};
