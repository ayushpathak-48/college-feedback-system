"use server";

import { createSessionClient } from "@/lib/appwrite/client";
import { Query } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

// Get All Documents Common Function
export async function getLatestFiveDocuments<T>(
  collectionId: string
): Promise<{ documents: T[]; total: number }> {
  const limit = 5;
  const queries = [Query.orderDesc("$createdAt"), Query.limit(limit)];

  const { databases } = await createSessionClient();

  const response = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId,
    queries
  );

  return { documents: response.documents as T[], total: response.total };
}
