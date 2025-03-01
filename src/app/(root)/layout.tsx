import React, { PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getAccount } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const RootLayout = async ({ children }: PropsWithChildren) => {
  const account = await getAccount();
  if (!account) {
    const cookie = await cookies();
    const session = cookie.get(
      process.env.NEXT_PUBLIC_APP_SESSION_COOKIE_NAME!
    );
    if (session && session.value) {
      return redirect("/");
    } else {
      return redirect("/sign-in");
    }
  }
  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar account={account} />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
