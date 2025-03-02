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
import { SignInSchema, SigninType } from "@/schema/auth.schema";
import { signInAccount } from "@/actions/auth.action";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingButton } from "@/components/LoadingButton";
import { APP_TITLE } from "@/lib/constants";
import { Eye, EyeOff } from "lucide-react";

export const SignInCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const form = useForm<SigninType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email_or_enrollment: "",
      password: "",
    },
  });

  const handleSubmit = async (values: SigninType) => {
    setIsLoading(true);
    try {
      const response = await signInAccount(values);
      if (response.success) {
        toast.success(`SignIn Successfull`);
        window.location.href = "/";
      } else {
        toast.error(`Error: Failed to Sign In  Error: ${response.error}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in");
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">{APP_TITLE} - Login</CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7 mb-2" />
      <CardContent className="p-7">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="email_or_enrollment"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Enrollment Id</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your email or Enrollment Id"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"password"}
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
            <DottedSeparator className="py-2" />
            <LoadingButton
              className="w-full"
              isLoading={isLoading}
              type="submit"
              size="lg"
            >
              Sign in
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
