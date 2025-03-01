import React, { PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getAccount } from "@/actions/auth.action";
import CheckAuthClient from "@/components/check-auth-client";
// import { headers } from "next/headers";
// import { routes } from "@/lib/constants";
// import { redirect } from "next/navigation";

const RootLayout = async ({ children }: PropsWithChildren) => {
  const account = await getAccount();
  if (!account) {
    return <CheckAuthClient />;
  }
  // const headerList = await headers();
  // const pathname = headerList.get("x-current-path");
  // const activeRoute = routes.find((route) =>
  //   pathname?.split("/")?.some((path) => route.href.includes(path))
  // );
  // if (activeRoute?.accessible) {
  //   if (
  //     !activeRoute.accessible.some((value) => account.labels.includes(value))
  //   ) {
  //     return redirect("/");
  //   }
  // }

  return (
    <>
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
    </>
  );
};

export default RootLayout;
