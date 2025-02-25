"use client";

import Link from "next/link";
import { DottedSeparator } from "./DottedSeparator";
import { Navigation } from "@/components/navigation";
// import { WorkspaceSwitcher } from "./workspace-switcher";
import { APP_TITLE } from "@/lib/constants";
// import Projects from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href={"/"} className="text-3xl flex items-center justify-center">
        {APP_TITLE}
      </Link>
      <DottedSeparator className="my-4" />
      {/* <WorkspaceSwitcher />
      <DottedSeparator className="my-4" /> */}
      <Navigation />
      <DottedSeparator className="my-4" />
      {/* <Projects /> */}
    </aside>
  );
};
