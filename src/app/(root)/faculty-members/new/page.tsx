import React from "react";
import FacultyMemberForm from "../components/faculty-member-form";
import { getAllFaculties } from "@/actions/admin.actions";

const page = async () => {
  const faculties = (await getAllFaculties()).data?.documents;
  return <FacultyMemberForm faculties={faculties || []} />;
};

export default page;
