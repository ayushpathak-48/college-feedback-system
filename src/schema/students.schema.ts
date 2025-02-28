import * as z from "zod";

export const StudentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  course_id: z.string().min(1, { message: "Course is required" }),
  enrollment_id: z.string().min(1, { message: "Enrollment ID is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  current_semester: z
    .string()
    .min(1, { message: "Current Semester is required" }),
});
export type StudentSchemaType = z.infer<typeof StudentSchema>;

export const EditStudentSchema = z.object({
  student_id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  course_id: z.string().min(1, { message: "Course is required" }),
  enrollment_id: z.string().min(1, { message: "Enrollment ID is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  current_semester: z
    .string()
    .min(1, { message: "Current Semester is required" }),
});
export type EditStudentSchemaType = z.infer<typeof EditStudentSchema>;
