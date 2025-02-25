import { getAccount } from "@/actions/auth.action";
import { SignInCard } from "@/components/sign-in-card";
import { APP_TITLE } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Sign In - ${APP_TITLE}`,
};

const SignInPage = async () => {
  const account = await getAccount();
  if (account) {
    redirect("/");
  }
  return <SignInCard />;
};

export default SignInPage;
