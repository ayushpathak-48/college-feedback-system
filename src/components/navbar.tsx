"use client";

// import { UserButton } from "@/components/user-button";
import React from "react";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { usePathname } from "next/navigation";

const pathnameMap = {
  feedbacks: {
    title: "Feedbacks",
    description: "View all feedback list here submitted by students",
  },
  faculties: {
    title: "Faculties List",
    description: "View and manage faculties list here",
  },
  students: {
    title: "Students List",
    description: "View and manage students list here",
  },
  streams: {
    title: "Streams List",
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

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  console.log({ pathnameParts });
  const pathnameKey = pathnameParts[1] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

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
