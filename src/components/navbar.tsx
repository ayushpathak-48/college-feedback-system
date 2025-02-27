/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { UserButton } from "@/components/user-button";
import React, { useEffect } from "react";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { usePathname } from "next/navigation";
import { Models } from "node-appwrite";
import { useUserStore } from "@/stores/user.store";

const pathnameMap = {
  feedbacks: {
    title: "Feedbacks",
    description: "View all feedback list here submitted by students",
  },
  faculties: {
    title: "All Faculties",
    description: "View and manage faculties list here",
  },
  "faculty-members": {
    title: "All Faculties Members",
    description: "View and manage faculty members list here",
  },
  students: {
    title: "All Students",
    description: "View and manage students list here",
  },
  courses: {
    title: "All Courses",
    description: "View and manage all streams list here",
  },
  "submit-feedback": {
    title: "Submit Feedback",
    description: "Submit your feedback. It's totally anonymous",
  },
  reports: {
    title: "Reports and Summary",
    description: "View all the reports based on the feedback",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all your projects and tasks here",
};

export const Navbar = ({ account }: { account: Models.User<any> }) => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[1] as keyof typeof pathnameMap;
  const { title, description } = pathnameMap[pathnameKey] || defaultMap;
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(account);
  }, [account, setUser]);

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="lg:flex flex-col hidden">
        <div className="text-2xl font-semibold">{title}</div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      {/* <UserButton /> */}
    </nav>
  );
};
