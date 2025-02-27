import {
  ChartArea,
  ClipboardListIcon,
  DicesIcon,
  HashIcon,
  HomeIcon,
  UsersIcon,
  UserSquareIcon,
} from "lucide-react";

export const APP_TITLE = "Feedgun";
export const routes = [
  {
    label: "home",
    href: "/",
    icon: HomeIcon,
    activeIcon: HomeIcon,
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
    icon: UserSquareIcon,
    activeIcon: UserSquareIcon,
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
    label: "Courses",
    href: "/courses",
    icon: HashIcon,
    activeIcon: HashIcon,
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
    accessible: ["students"],
  },
];

export const defaultStudentPassword = "12345678";
