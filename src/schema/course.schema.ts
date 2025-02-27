import * as z from "zod";

export const CourseSchema = z.object({
  faculty_id: z.string().min(1, { message: "Faculty is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  total_semesters: z
    .string()
    .min(1, { message: "Total Semesters is required" }),
});
export type CourseSchemaType = z.infer<typeof CourseSchema>;
