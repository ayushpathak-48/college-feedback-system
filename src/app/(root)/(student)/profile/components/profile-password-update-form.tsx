"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/LoadingButton";
import { DottedSeparator } from "@/components/DottedSeparator";
import {
  UpdateStudentPasswordSchema,
  UpdateStudentPasswordSchemaType,
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

import { Eye, EyeOff } from "lucide-react";
import { updateStudentPassword } from "@/actions/admin.actions";

const ProfilePasswordUpdateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState({
    old: "password",
    new: "password",
    repeat: "password",
  });

  const form = useForm<UpdateStudentPasswordSchemaType>({
    resolver: zodResolver(UpdateStudentPasswordSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
      repeatNewPassword: "",
    },
  });

  const handleSubmit = async (values: UpdateStudentPasswordSchemaType) => {
    setIsLoading(true);
    try {
      const response = await updateStudentPassword(values);
      if (response.success) {
        toast.success(`Password updated successfully`);
      } else {
        toast.error(`Failed to update password Error: ${response.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to update password Error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-max border-none shadow-none mx-auto">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Update Password</CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7 mb-2" />
      <CardContent className="p-7">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={passwordType.old}
                        placeholder="Enter password here"
                      />
                      {passwordType.old == "text" ? (
                        <Eye
                          onClick={() =>
                            setPasswordType({
                              ...passwordType,
                              old: "password",
                            })
                          }
                          className="absolute top-4 right-3 cursor-pointer size-5 text-gray-600"
                        />
                      ) : (
                        <EyeOff
                          onClick={() =>
                            setPasswordType({
                              ...passwordType,
                              old: "text",
                            })
                          }
                          className="absolute top-4 right-3 cursor-pointer size-5 text-gray-600"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={passwordType.new}
                        placeholder="Enter password here"
                      />
                      {passwordType.new == "text" ? (
                        <Eye
                          onClick={() =>
                            setPasswordType({
                              ...passwordType,
                              new: "password",
                            })
                          }
                          className="absolute top-4 right-3 cursor-pointer size-5 text-gray-600"
                        />
                      ) : (
                        <EyeOff
                          onClick={() =>
                            setPasswordType({
                              ...passwordType,
                              new: "text",
                            })
                          }
                          className="absolute top-4 right-3 cursor-pointer size-5 text-gray-600"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="repeatNewPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={passwordType.repeat}
                        placeholder="Enter password here"
                      />
                      {passwordType.repeat == "text" ? (
                        <Eye
                          onClick={() =>
                            setPasswordType({
                              ...passwordType,
                              repeat: "password",
                            })
                          }
                          className="absolute top-4 right-3 cursor-pointer size-5 text-gray-600"
                        />
                      ) : (
                        <EyeOff
                          onClick={() =>
                            setPasswordType({
                              ...passwordType,
                              repeat: "text",
                            })
                          }
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

export default ProfilePasswordUpdateForm;
