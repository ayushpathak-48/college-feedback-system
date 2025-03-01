import { getAllFacultyMembers } from "@/actions/admin.actions";
import { FacultyMemberReportClient } from "./client";

const FacultyMembersPage = async () => {
  const members = (await getAllFacultyMembers()).data?.documents;
  if (!members)
    return (
      <div className="h-20 text-20 flex items-center justify-center text-center">
        No Faculty Members
      </div>
    );
  return <FacultyMemberReportClient members={members} />;
};

export default FacultyMembersPage;
