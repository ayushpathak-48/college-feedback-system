/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { UserButton } from "@/components/user-button";
import React, { useEffect } from "react";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { usePathname } from "next/navigation";
import { Models } from "node-appwrite";
import { useUserStore } from "@/stores/user.store";
import Link from "next/link";
import { APP_TITLE, defaultMap, pathnameMap } from "@/lib/constants";
import { UserButton } from "./user-button";

export const Navbar = ({
  account,
}: {
  account: Models.User<any> & { student: any };
}) => {
  const pathname = usePathname();
  // const router = useRouter();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[1] as keyof typeof pathnameMap;
  const { title, description } = pathnameMap[pathnameKey] || defaultMap;
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(account);
  }, [account, setUser]);

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <Link
        href={"/"}
        className="hidden text-xl max-lg:flex items-center justify-center"
      >
        {APP_TITLE}
      </Link>
      <div className="lg:flex flex-col hidden">
        <div className="text-2xl font-semibold">{title}</div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
