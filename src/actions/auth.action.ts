"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite/client";
import {
  SigninType,
  SignInSchema,
  SignupType,
  SignUpSchema,
} from "@/schema/auth.schema";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAccount(form: SigninType) {
  const parsedBody = SignInSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailPasswordSession(
      parsedBody.data.email,
      parsedBody.data.password
    );
    const oneYear = 365 * 24 * 60 * 60 * 1000;

    const cookie = await cookies();
    cookie.set(
      process.env.NEXT_PUBLIC_APP_SESSION_COOKIE_NAME!,
      session.secret,
      {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: Date.now() + oneYear,
      }
    );
    return { success: true, message: "Sign In Successfully" };
  } catch (error) {
    return { success: false, message: "Failed to Signin", error: error };
  }
}

export async function signUpAccount(form: SignupType) {
  const parsedBody = SignUpSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const user = parsedBody.data;
  const { account } = await createAdminClient();

  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    const cookie = await cookies();
    cookie.set(
      process.env.NEXT_PUBLIC_APP_SESSION_COOKIE_NAME!,
      session.secret,
      {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: Date.now() + oneYear,
      }
    );

    return { success: true, message: "Sign In Successfully", data: newAccount };
  } catch (error) {
    return JSON.parse(JSON.stringify(error));
  }
}

export async function getAccount() {
  try {
    const { account } = await createSessionClient();
    const currentAccount = await account.get();
    return currentAccount;
  } catch {
    return null;
  }
}

export async function verifyEmail() {
  try {
    const { account } = await createSessionClient();
    const verifyEmail = await account.createVerification(
      window.location.origin + "/verify-account"
    );
    return verifyEmail;
  } catch (error) {
    return error;
  }
}

export async function updateVerification(userId: string, secret: string) {
  try {
    const { account } = await createAdminClient();
    const verifyEmail = await account.updateVerification(userId, secret);
    return verifyEmail;
  } catch (error) {
    return error;
  }
}

export const signOutUser = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    (await cookies()).delete(process.env.NEXT_PUBLIC_APP_SESSION_COOKIE_NAME!);
    return redirect("/sign-in");
  } catch {
    return null;
  }
};
