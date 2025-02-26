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
import { FacultySchema, FacultySchemaType } from "@/schema/faculty.schema";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingButton } from "@/components/LoadingButton";
import { addNewFaculty } from "@/actions/admin.actions";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FacultySchemaType>({
    resolver: zodResolver(FacultySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: FacultySchemaType) => {
    setIsLoading(true);
    try {
      const response = await addNewFaculty(values);
      if (response.success) {
        toast.success(`Faculty added successfully`);
        router.push("/faculties");
      } else {
        toast.error(`Failed to add faculty`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add faculty");
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-max md:w-[487px] mx-auto">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Create Faculty</CardTitle>
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
              Add Faculty
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
