import * as z from "zod";

export const FacultyMembersSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  faculty_id: z.string().min(1, { message: "Name is required" }),
});
export type FacultyMembersSchemaType = z.infer<typeof FacultyMembersSchema>;
