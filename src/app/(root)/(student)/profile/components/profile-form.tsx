/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useState } from "react";
import { GENDER, StudentType } from "@/types";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/LoadingButton";
import { updateStudent } from "@/actions/admin.actions";
import { DottedSeparator } from "@/components/DottedSeparator";
import {
  EditStudentSchema,
  EditStudentSchemaType,
} from "@/schema/students.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ProfileForm = ({ student }: { student: StudentType | any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<EditStudentSchemaType>({
    resolver: zodResolver(EditStudentSchema),
    defaultValues: {
      student_id: student?.$id,
      course_id: student?.course?.$id,
      current_semester: student?.current_semester.toString(),
      email: student?.email_id,
      enrollment_id: student?.enrollment_id,
      name: student?.name,
      gender: student?.gender,
    },
  });

  const handleSubmit = async (values: EditStudentSchemaType) => {
    setIsLoading(true);
    try {
      const response = await updateStudent(values);
      if (response.success) {
        toast.success(`Profile updated successfully`);
      } else {
        toast.error(`Failed to update profile Error: ${response.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to update profile Error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full  h-max border-0 shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Hey {student?.name} 👋</CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7 mb-2" />
      <CardContent className="p-7 ">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="enrollment_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enrollment ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter enrollment id"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter student name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      disabled
                      {...field}
                      type="text"
                      placeholder="Enter student email id"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="current_semester"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Semester</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter student semester"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <FormItem
                        className={"flex items-center space-x-3 space-y-0"}
                      >
                        <FormControl>
                          <RadioGroupItem value={GENDER.MALE} />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">
                          {GENDER.MALE.toLowerCase()}
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className={"flex items-center space-x-3 space-y-0"}
                      >
                        <FormControl>
                          <RadioGroupItem value={GENDER.FEMALE} />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">
                          {GENDER.FEMALE.toLowerCase()}
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className={"flex items-center space-x-3 space-y-0"}
                      >
                        <FormControl>
                          <RadioGroupItem value={GENDER.OTHER} />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">
                          {GENDER.OTHER.toLowerCase()}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DottedSeparator className="py-1" />
            <LoadingButton
              className="w-full"
              isLoading={isLoading}
              type="submit"
              size="lg"
            >
              Update Profile
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
