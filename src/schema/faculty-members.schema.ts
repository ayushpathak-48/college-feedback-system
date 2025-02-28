import * as z from "zod";

export const FacultyMembersSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  faculty_id: z.string().min(1, { message: "Name is required" }),
});
export type FacultyMembersSchemaType = z.infer<typeof FacultyMembersSchema>;

export const EditFacultyMembersSchema = z.object({
  member_id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  faculty_id: z.string().min(1, { message: "Name is required" }),
});
export type EditFacultyMembersSchemaType = z.infer<
  typeof EditFacultyMembersSchema
>;
