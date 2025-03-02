"use client";

import { toast } from "sonner";
import { useState } from "react";
import { StudentType } from "@/types";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/LoadingButton";
import { DottedSeparator } from "@/components/DottedSeparator";
import {
  UpdatePasswordSchema,
  UpdatePasswordSchemaType,
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

import { useRouter } from "next/navigation";
import { updatePassword } from "@/actions/auth.action";
import { Eye, EyeOff } from "lucide-react";

const UpdatePasswordForm = ({ student }: { student: StudentType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const form = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      student_id: student.accountId,
      password: "",
    },
  });

  const handleSubmit = async (values: UpdatePasswordSchemaType) => {
    setIsLoading(true);
    try {
      const response = await updatePassword(values);
      if (response.success) {
        toast.success(`Student password updated successfully`);
        router.push("/students");
      } else {
        toast.error(
          `Failed to update student password Error: ${response.error}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to update student password Error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-max md:w-[487px] mx-auto">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          Update Password of {student.name}
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
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={passwordType}
                        placeholder="Enter password here"
                      />
                      {passwordType == "text" ? (
                        <Eye
                          onClick={() => setPasswordType("password")}
                          className="absolute top-4 right-3 cursor-pointer size-5 text-gray-600"
                        />
                      ) : (
                        <EyeOff
                          onClick={() => setPasswordType("text")}
                          className="absolute top-4 right-3 cursor-pointer size-5 text-gray-600"
                        />
                      )}
                    </div>
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

export default UpdatePasswordForm;
