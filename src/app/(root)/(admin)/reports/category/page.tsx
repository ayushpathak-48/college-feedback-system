import { getAllStudents } from "@/actions/admin.actions";
import { CategoryReportClient } from "./client";

const CategoryPage = async () => {
  const students = (await getAllStudents()).data?.documents;
  return <CategoryReportClient students={students || []} />;
};

export default CategoryPage;
