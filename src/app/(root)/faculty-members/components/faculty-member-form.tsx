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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FacultyMembersSchema,
  FacultyMembersSchemaType,
} from "@/schema/faculty-members.schema";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingButton } from "@/components/LoadingButton";
// import { useRouter } from "next/navigation";
import { FacultyType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addNewFacultymember } from "@/actions/admin.actions";

const FacultyMemberForm = ({ faculties }: { faculties: FacultyType[] }) => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FacultyMembersSchemaType>({
    resolver: zodResolver(FacultyMembersSchema),
    defaultValues: {
      faculty_id: "",
      name: "",
    },
  });

  const handleSubmit = async (values: FacultyMembersSchemaType) => {
    setIsLoading(true);
    try {
      const response = await addNewFacultymember(values);
      if (response.success) {
        toast.success(`Faculty member added successfully`);
        form.setValue("name", "");
      } else {
        toast.error(`Failed to add faculty member`);
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
        <CardTitle className="text-2xl">Add Faculty Member</CardTitle>
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
              name="faculty_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Faculty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a suitable faculty for this member" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {faculties.map((faculty) => (
                        <SelectItem key={faculty.$id} value={faculty.$id}>
                          {faculty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              Add Faculty Member
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FacultyMemberForm;
