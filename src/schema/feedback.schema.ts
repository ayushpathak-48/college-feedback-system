import * as z from "zod";

export const FeedbackSchema = z.object({
  faculty_id: z.string().min(1, { message: "Faculty Id is required" }),
  teaching_quality: z.string().min(1, { message: "This field is required" }),
  communication_skills: z
    .string()
    .min(1, { message: "This field is required" }),
  subject_knowledge: z.string().min(1, { message: "This field is required" }),
  student_engagement: z.string().min(1, { message: "This field is required" }),
  punctuality_and_discipline: z
    .string()
    .min(1, { message: "This field is required" }),
  comment: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Max 1000 characters allowed" }),
});
export type FeedbackSchemaType = z.infer<typeof FeedbackSchema>;
