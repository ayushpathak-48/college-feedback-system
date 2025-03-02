import {
  ChartArea,
  ClipboardListIcon,
  DicesIcon,
  HashIcon,
  HomeIcon,
  UsersIcon,
  Building,
  UserSquareIcon,
} from "lucide-react";

export const APP_TITLE = "Feedbun";

export const pathnameMap = {
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
  "feedback-settings": {
    title: "Feedback Settings",
    description: "",
  },
};

export const defaultMap = {
  title: "Home",
  description: "",
};

export const routes = [
  {
    label: "home",
    href: "/",
    icon: HomeIcon,
    activeIcon: HomeIcon,
    accessible: ["admin"],
  },
  {
    label: "Feedbacks",
    href: "/feedbacks",
    icon: DicesIcon,
    activeIcon: DicesIcon,
    accessible: ["admin"],
  },
  {
    label: "Faculties",
    href: "/faculties",
    icon: Building,
    activeIcon: Building,
    accessible: ["admin"],
  },
  {
    label: "Courses",
    href: "/courses",
    icon: HashIcon,
    activeIcon: HashIcon,
    accessible: ["admin"],
  },
  {
    label: "Faculty Members",
    href: "/faculty-members",
    icon: UserSquareIcon,
    activeIcon: UserSquareIcon,
    accessible: ["admin"],
  },
  {
    label: "Students",
    href: "/students",
    icon: UsersIcon,
    activeIcon: UsersIcon,
    accessible: ["admin"],
  },
  {
    label: "Submit Feedback",
    href: "/submit-feedback",
    icon: ClipboardListIcon,
    activeIcon: ClipboardListIcon,
    accessible: ["student"],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: ChartArea,
    activeIcon: ChartArea,
    accessible: ["admin"],
  },
];

export const defaultStudentPassword = "12345678";
