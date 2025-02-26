import * as z from "zod";

export const FacultySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});
export type FacultySchemaType = z.infer<typeof FacultySchema>;
