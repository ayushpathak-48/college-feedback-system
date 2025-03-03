"use server";

import { createSessionClient } from "@/lib/appwrite/client";
import { Query } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

// Get All Documents Common Function
export async function getLimitedDocuments<T>(
  collectionId: string,
  extraQueries: string[] = [],
  limit: number = 5
): Promise<{ documents: T[]; total: number }> {
  const queries = [
    Query.orderDesc("$createdAt"),
    Query.limit(limit),
    ...extraQueries,
  ];

  const { databases } = await createSessionClient();

  const response = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId,
    queries
  );

  return { documents: response.documents as T[], total: response.total };
}
