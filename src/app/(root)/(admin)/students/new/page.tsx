import { getAllCourses } from "@/actions/admin.actions";
import StudentForm from "../components/student-form";

const page = async () => {
  const data = (await getAllCourses()).data?.documents;

  return <StudentForm courses={data || []} />;
};

export default page;
