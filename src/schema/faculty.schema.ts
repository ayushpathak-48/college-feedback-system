import * as z from "zod";

export const FacultySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});
export type FacultySchemaType = z.infer<typeof FacultySchema>;

export const EditFacultySchema = z.object({
  faculty_id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
});
export type EditFacultySchemaType = z.infer<typeof EditFacultySchema>;
