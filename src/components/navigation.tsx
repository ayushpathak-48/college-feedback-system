"use client";

import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user.store";
import Link from "next/link";

import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = pathname === item.href;
        const Icon = isActive ? item.activeIcon : item.icon;

        const isAdmin = user?.labels.includes("admin");
        const isStudent = user?.labels.includes("student");

        if (
          !item.accessible ||
          (isAdmin && item.accessible?.includes("admin")) ||
          (isStudent && item.accessible?.includes("student"))
        )
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <Icon
                  className={cn(
                    "size-5 text-neutral-500",
                    isActive && "text-primary"
                  )}
                />
                {item.label}
              </div>
            </Link>
          );
      })}
    </ul>
  );
};
