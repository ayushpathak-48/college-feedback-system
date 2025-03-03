import { getAccount } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren) => {
  const account = await getAccount();
  if (!account) {
    return redirect("/sign-in");
  }
  if (!account.labels.includes("admin")) return redirect("/submit-feedback");
  return <>{children}</>;
};

export default layout;
