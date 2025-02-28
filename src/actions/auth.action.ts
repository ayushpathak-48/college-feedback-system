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
import { getStudentByEmail } from "./admin.actions";

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

    return { success: true, message: "Sign Up successfull", data: newAccount };
  } catch (error) {
    return { success: false, message: "Sign Up failed", error };
  }
}

export async function deleteAccount(id: string) {
  const { users } = await createAdminClient();

  try {
    const deletedAccount = await users.delete(id);

    return {
      success: true,
      message: "Sign Up successfull",
      data: deletedAccount,
    };
  } catch (error) {
    return { success: false, message: "Sign Up failed", error };
  }
}

export async function getAccount() {
  try {
    const { account } = await createSessionClient();
    const currentAccount = await account.get();
    const studentAccount = (await getStudentByEmail(currentAccount.email)).data;
    if (currentAccount.labels.includes("student")) {
      return {
        ...currentAccount,
        student: studentAccount,
      };
    }

    return {
      ...currentAccount,
      student: null,
    };
  } catch {
    return null;
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
