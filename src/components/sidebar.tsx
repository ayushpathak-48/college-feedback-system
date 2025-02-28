"use client";

import Link from "next/link";
import { DottedSeparator } from "./DottedSeparator";
import { Navigation } from "@/components/navigation";
// import { WorkspaceSwitcher } from "./workspace-switcher";
import { APP_TITLE } from "@/lib/constants";
import { Button } from "./ui/button";
import { signOutUser } from "@/actions/auth.action";
// import Projects from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full flex flex-col justify-between">
      <div>
        <Link href={"/"} className="text-3xl flex items-center justify-center">
          {APP_TITLE}
        </Link>
        <DottedSeparator className="my-4" />
        <Navigation />
      </div>
      <div className="flex flex-col">
        <DottedSeparator className="my-4" />
        <Button
          onClick={signOutUser}
          variant={"outline"}
          className="w-full mt-auto"
        >
          Logout{" "}
        </Button>
      </div>
    </aside>
  );
};
