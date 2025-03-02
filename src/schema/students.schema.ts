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

export const UpdatePasswordSchema = z.object({
  student_id: z.string(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password should be minimum 8 characters long" }),
});
export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>;

export const UpdateStudentPasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, { message: "Old password is required" })
    .min(8, { message: "Old password should be minimum 8 characters long" }),
  newPassword: z
    .string()
    .min(1, { message: "New Password is required" })
    .min(8, { message: "New Password should be minimum 8 characters long" }),
  repeatNewPassword: z
    .string()
    .min(1, { message: "Repeat new password is required" })
    .min(8, {
      message: "Repeat new password should be minimum 8 characters long",
    }),
});
export type UpdateStudentPasswordSchemaType = z.infer<
  typeof UpdateStudentPasswordSchema
>;
