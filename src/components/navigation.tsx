"use client";

import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = pathname === item.href;
        const Icon = isActive ? item.activeIcon : item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
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
