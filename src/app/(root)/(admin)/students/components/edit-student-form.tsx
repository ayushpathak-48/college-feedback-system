// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import { toast } from "sonner";
import { useState } from "react";
import { CoursesType, GENDER, StudentType } from "@/types";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

const EditStudentForm = ({
  student,
  courses,
}: {
  student: StudentType;
  courses: CoursesType[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<EditStudentSchemaType>({
    resolver: zodResolver(EditStudentSchema),
    defaultValues: {
      student_id: student.$id,
      course_id: student.course.$id,
      current_semester: student.current_semester.toString(),
      email: student.email_id,
      enrollment_id: student.enrollment_id,
      name: student.name,
      gender: student.gender,
    },
  });

  const handleSubmit = async (values: EditStudentSchemaType) => {
    setIsLoading(true);
    try {
      const response = await updateStudent(values);
      if (response.success) {
        toast.success(`Student updated successfully`);
        router.push("/students");
      } else {
        toast.error(`Failed to update student Error: ${response.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to update student Error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-max md:w-[487px] mx-auto">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          Update Student: {student.name}
        </CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7 mb-2" />
      <CardContent className="p-7">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="course_id"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Course</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? courses.find(
                                (course) => course.$id === field.value
                              )?.name
                            : "Select course"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full md:w-[400px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search course..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No courses found.</CommandEmpty>
                          <CommandGroup>
                            {courses.map((course) => (
                              <CommandItem
                                value={course.name}
                                key={course.$id}
                                onSelect={() => {
                                  form.setValue("course_id", course.$id);
                                  setOpen(false);
                                }}
                              >
                                {course.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    course.$id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default EditStudentForm;
