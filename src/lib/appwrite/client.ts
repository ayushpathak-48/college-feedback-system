"use server";
import { appwriteConfig } from "./config";
import {
  Client,
  Account,
  Databases,
  Messaging,
  Users,
  Storage,
} from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);
  const cookie = await cookies();
  const session = cookie.get(process.env.NEXT_PUBLIC_APP_SESSION_COOKIE_NAME!);
  if (!session || !session.value) {
    throw new Error("No session");
  }
  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiSecret);
  return {
    get account() {
      return new Account(client);
    },
    get messaging() {
      return new Messaging(client);
    },
    get databases() {
      return new Databases(client);
    },
    get users() {
      return new Users(client);
    },
  };
}
