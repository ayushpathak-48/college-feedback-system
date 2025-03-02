"use client";

import { Input } from "@/components/ui/input";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  EditFacultySchema,
  EditFacultySchemaType,
} from "@/schema/faculty.schema";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingButton } from "@/components/LoadingButton";
import { updateFaculty } from "@/actions/admin.actions";
import { FacultyType } from "@/types";
import { useRouter } from "next/navigation";

const EditFacultyForm = ({ faculty }: { faculty: FacultyType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<EditFacultySchemaType>({
    resolver: zodResolver(EditFacultySchema),
    defaultValues: {
      faculty_id: faculty.$id,
      name: faculty.name,
    },
  });

  const handleSubmit = async (values: EditFacultySchemaType) => {
    setIsLoading(true);
    try {
      const response = await updateFaculty(values);
      if (response.success) {
        toast.success(`Faculty updated successfully`);
        router.push("/faculties");
      } else {
        toast.error(`Failed to update faculty  Error: ${response.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update faculty");
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-max md:w-[487px] mx-auto">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Update Faculty</CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7 mb-2" />
      <CardContent className="p-7">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter faculty name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DottedSeparator className="px-7 mb-2" />
            <LoadingButton
              className="w-full"
              isLoading={isLoading}
              type="submit"
              size="lg"
            >
              Update
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditFacultyForm;
