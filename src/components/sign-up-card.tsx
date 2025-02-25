"use client";

import { Input } from "@/components/ui/input";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignUpSchema, SignupType } from "@/schema/auth.schema";
import { signUpAccount } from "@/actions/auth.action";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingButton } from "@/components/LoadingButton";
import { useRouter } from "next/navigation";

export const SignUpCard = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: SignupType) => {
    setIsLoading(true);
    try {
      const response = await signUpAccount(values);
      if (response.success) {
        toast.success(`Signup Successfull`);
        router.push("/workspaces/create");
      } else {
        toast.error(`Error: Failed to signup`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to signup");
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
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
                      type="name"
                      placeholder="Enter your name"
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
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password here"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              className="w-full"
              isLoading={isLoading}
              type="submit"
              size="lg"
            >
              Sign up
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
      <DottedSeparator className="px-7" />
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-700">
            &nbsp;Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
