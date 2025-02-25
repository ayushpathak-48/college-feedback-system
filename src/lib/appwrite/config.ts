export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_URL!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  apiSecret: process.env.APPWRITE_API_SECRET!,
  workspacesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_WORKSPACES_COLLECTION_ID!,
};
