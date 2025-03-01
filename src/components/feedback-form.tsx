// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewFeedback } from "@/actions/admin.actions";
import { LoadingButton } from "@/components/LoadingButton";
import { FacultyMemberType, FacultyType } from "@/types";
import { DottedSeparator } from "@/components/DottedSeparator";
import { FeedbackSchemaType, FeedbackSchema } from "@/schema/feedback.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
const FeedbackForm = ({
  facultyId,
  facultyMembers,
}: {
  facultyId: string;
  facultyMembers: FacultyMemberType[];
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [faculty, setFaculty] = useState<FacultyType>(null);
  const form = useForm<FeedbackSchemaType>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      faculty_id: facultyId,
      teaching_quality: "",
      communication_skills: "",
      punctuality_and_discipline: "",
      student_engagement: "",
      subject_knowledge: "",
      comment: "",
    },
  });

  const handleSubmit = async (values: FeedbackSchemaType) => {
    setIsLoading(true);
    try {
      const response = await addNewFeedback(values);
      if (response.success) {
        toast.success(`Feedback submitted successfully`);
        router.replace("/submit-feedback");
      } else {
        toast.error(`Failed to submit feedback! Error: ${response.error}`);
        if (response.isAlreadySubmitted) {
          router.replace("/submit-feedback");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to submit feedback! Error: ${response.error}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const singleFaculty = facultyMembers.find(({ $id }) => facultyId == $id);
    if (!singleFaculty) {
      router.replace("/submit-feedback");
    }
    setFaculty(singleFaculty);
  }, [facultyId, facultyMembers]);

  return (
    <Card className="w-full h-max border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-4 md:p-7">
        <CardTitle className="text-center text-2xl">
          Submit Feedback for Prof: {faculty?.name}
        </CardTitle>
        <CardDescription className="text-center">
          Rate the faculty member according to your perspective in stars out of
          5.
        </CardDescription>
      </CardHeader>
      <DottedSeparator className="px-4 md:px-7 mb-2" />
      <CardContent className="px-4 md:p-7">
        <Form {...form}>
          <form
            className="space-y-4 max-w-md mx-auto"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="teaching_quality"
              render={({ field }) => (
                <FormItem className="p-2 border rounded flex flex-col gap-3">
                  <FormLabel className="font-medium flex items-center justify-center text-lg text-black/70">
                    Teaching Quality
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3 justify-evenly">
                      {[
                        "Fair",
                        "Average",
                        "Good",
                        "Very Good",
                        "Excellent",
                      ].map((item, i) => (
                        <div key={item}>
                          <FormLabel
                            onClick={() => {
                              form.setValue(
                                "teaching_quality",
                                (i + 1).toString()
                              );
                              form.clearErrors("teaching_quality");
                            }}
                          >
                            <StarIcon
                              className={cn(
                                "cursor-pointer fill-transparent stroke-gray-400",
                                parseInt(form.getValues().teaching_quality) >
                                  i && "fill-yellow-500 stroke-yellow-500",
                                form.control._formState.errors
                                  .teaching_quality && "stroke-red-400"
                              )}
                            />
                          </FormLabel>
                          <Input
                            {...field}
                            id={item + "_" + i}
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="communication_skills"
              render={({ field }) => (
                <FormItem className="p-2 border rounded flex flex-col gap-3">
                  <FormLabel className="font-medium flex items-center justify-center text-lg text-black/70">
                    Communication Skills
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3 justify-evenly">
                      {[
                        "Fair",
                        "Average",
                        "Good",
                        "Very Good",
                        "Excellent",
                      ].map((item, i) => (
                        <div key={item}>
                          <FormLabel
                            onClick={() => {
                              form.setValue(
                                "communication_skills",
                                (i + 1).toString()
                              );
                              form.clearErrors("communication_skills");
                            }}
                          >
                            <StarIcon
                              className={cn(
                                "cursor-pointer fill-transparent stroke-gray-400",
                                parseInt(
                                  form.getValues().communication_skills
                                ) > i && "fill-yellow-500 stroke-yellow-500",
                                form.control._formState.errors
                                  .communication_skills && "stroke-red-400"
                              )}
                            />
                          </FormLabel>
                          <Input
                            {...field}
                            id={item + "_" + i}
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject_knowledge"
              render={({ field }) => (
                <FormItem className="p-2 border rounded flex flex-col gap-3">
                  <FormLabel className="font-medium flex items-center justify-center text-lg text-black/70">
                    Subject Knowledge
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3 justify-evenly">
                      {[
                        "Fair",
                        "Average",
                        "Good",
                        "Very Good",
                        "Excellent",
                      ].map((item, i) => (
                        <div key={item}>
                          <FormLabel
                            onClick={() => {
                              form.setValue(
                                "subject_knowledge",
                                (i + 1).toString()
                              );
                              form.clearErrors("subject_knowledge");
                            }}
                          >
                            <StarIcon
                              className={cn(
                                "cursor-pointer fill-transparent stroke-gray-400",
                                parseInt(form.getValues().subject_knowledge) >
                                  i && "fill-yellow-500 stroke-yellow-500",
                                form.control._formState.errors
                                  .subject_knowledge && "stroke-red-400"
                              )}
                            />
                          </FormLabel>
                          <Input
                            {...field}
                            id={item + "_" + i}
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="student_engagement"
              render={({ field }) => (
                <FormItem className="p-2 border rounded flex flex-col gap-3">
                  <FormLabel className="font-medium flex items-center justify-center text-lg text-black/70">
                    Student engagement
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3 justify-evenly">
                      {[
                        "Fair",
                        "Average",
                        "Good",
                        "Very Good",
                        "Excellent",
                      ].map((item, i) => (
                        <div key={item}>
                          <FormLabel
                            onClick={() => {
                              form.setValue(
                                "student_engagement",
                                (i + 1).toString()
                              );
                              form.clearErrors("student_engagement");
                            }}
                          >
                            <StarIcon
                              className={cn(
                                "cursor-pointer fill-transparent stroke-gray-400",
                                parseInt(form.getValues().student_engagement) >
                                  i && "fill-yellow-500 stroke-yellow-500",
                                form.control._formState.errors
                                  .student_engagement && "stroke-red-400"
                              )}
                            />
                          </FormLabel>
                          <Input
                            {...field}
                            id={item + "_" + i}
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="punctuality_and_discipline"
              render={({ field }) => (
                <FormItem className="p-2 border rounded flex flex-col gap-3">
                  <FormLabel className="font-medium flex items-center justify-center text-lg text-black/70">
                    Punctuality & Discipline
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3 justify-evenly">
                      {[
                        "Fair",
                        "Average",
                        "Good",
                        "Very Good",
                        "Excellent",
                      ].map((item, i) => (
                        <div key={item}>
                          <FormLabel
                            onClick={() => {
                              form.setValue(
                                "punctuality_and_discipline",
                                (i + 1).toString()
                              );
                              form.clearErrors("punctuality_and_discipline");
                            }}
                          >
                            <StarIcon
                              className={cn(
                                "cursor-pointer fill-transparent stroke-gray-400",
                                parseInt(
                                  form.getValues().punctuality_and_discipline
                                ) > i && "fill-yellow-500 stroke-yellow-500",
                                form.control._formState.errors
                                  .student_engagement && "stroke-red-400"
                              )}
                            />
                          </FormLabel>
                          <Input
                            {...field}
                            id={item + "_" + i}
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <FormField
              name="comment"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Enter comments max 1000 characters"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DottedSeparator className="px-7 mb-2" />
            <CardDescription className="text-center">
              Check your feedback before submitting. After submitting it you
              cannot change it
            </CardDescription>
            <LoadingButton
              className="w-full"
              isLoading={isLoading}
              type="submit"
              size="lg"
            >
              Submit Feedback
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
