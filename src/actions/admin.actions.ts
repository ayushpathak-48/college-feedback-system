"use server";

import { createSessionClient } from "@/lib/appwrite/client";
import { FacultySchema, FacultySchemaType } from "@/schema/faculty.schema";

import { ID } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { FacultyType } from "@/types";

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
