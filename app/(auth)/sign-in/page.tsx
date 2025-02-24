"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailOtp, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEmailVerificationStore } from "@/store/email-verification";

const formSchema = z.object({
  email: z.string().min(10, {
    message: "Email must be at least 10 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setEmail } = useEmailVerificationStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
          // toast.info("Almost there...");
        },
        onRequest: () => {
          setLoading(true);
          toast.info("Please wait...");
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            emailOtp.sendVerificationOtp({
              email: values.email,
              type: "email-verification",
            });
            setEmail(values.email);
            router.push("/email-verification");
          }
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Logged in successfully");
          router.push("/dashboard");
        },
      },
    });
  }

  return (
    <div className="h-dvh flex justify-center items-center">
      <div className=" w-1/2 xl:w-1/3 md:w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} type="email" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="text-base">
              Don&apos;t have an account?{" "}
              <a href="/sign-up" className="text-red-500 font-semibold">
                Sign Up
              </a>
            </h1>
            <Button
              disabled={loading}
              type="submit"
              className="text-[20px] font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
