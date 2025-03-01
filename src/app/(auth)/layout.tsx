"use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
import { APP_TITLE } from "@/lib/constants";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  // const pathname = usePathname();
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div>{APP_TITLE}</div>
          {/* <Button variant={"secondary"} asChild>
            {pathname == "/sign-up" ? (
              <Link href="/sign-in">Sign In</Link>
            ) : (
              <Link href="/sign-up">Sign Up</Link>
            )}
          </Button> */}
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
