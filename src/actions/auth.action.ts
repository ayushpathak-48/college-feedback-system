/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { getStudentByEmail, getStudentByEnrollmentId } from "./admin.actions";
import {
  UpdatePasswordSchema,
  UpdatePasswordSchemaType,
} from "@/schema/students.schema";

export async function signInAccount(form: SigninType) {
  const parsedBody = SignInSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }
  const { account } = await createAdminClient();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    parsedBody.data.email_or_enrollment
  );

  let email = "";

  if (isEmail) {
    email = parsedBody.data.email_or_enrollment;
  } else {
    const student = await getStudentByEnrollmentId(
      parsedBody.data.email_or_enrollment
    );
    if (student.success && student.data?.email_id) {
      email = student.data?.email_id;
    } else {
      return {
        success: false,
        message: "Invalid email or enrollment",
        error: student.error || "Invalid email or Enrollment Id",
      };
    }
  }

  try {
    const session = await account.createEmailPasswordSession(
      email,
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
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to Signin",
      error:
        typeof error == "object"
          ? error?.message
            ? error?.message
            : JSON.stringify(error)
          : error,
    };
  }
}

export async function signUpAccount(form: SignupType) {
  const parsedBody = SignUpSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const user = parsedBody.data;
  try {
    const { account } = await createAdminClient();
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

export async function updatePassword(form: UpdatePasswordSchemaType) {
  const parsedBody = UpdatePasswordSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }
  const { users } = await createAdminClient();

  const { student_id, password } = parsedBody.data;

  try {
    const updatedStudentPassword = await users.updatePassword(
      student_id,
      password
    );

    return {
      success: true,
      message: "Password updated successfully",
      data: updatedStudentPassword,
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
        student: { ...studentAccount, accountId: currentAccount.$id },
      };
    }

    return {
      ...currentAccount,
      student: undefined,
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
