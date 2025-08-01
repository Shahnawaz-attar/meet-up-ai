"use client";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { OctagonAlertIcon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth.client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const SignInView = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    try {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });
      setPending(false);
      router.push("/");
    } catch {
      setPending(false);
      setError("An error occurred while signing in.");
    }
  };

  const onSocial = (provider: "github" | "google") => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col itms-center text-center">
                  <h1>Welcome back! </h1>
                  <p className="text-muted-foreground text-balance">
                    Please login
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
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
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={pending}>
                    Sign In
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      disabled={pending}
                      onClick={() => onSocial("google")}
                      variant="outline"
                      type="button"
                      className="w-full"
                    >
                      <FaGoogle />
                    </Button>
                    <Button
                      disabled={pending}
                      onClick={() => onSocial("github")}
                      variant="outline"
                      type="button"
                      className="w-full"
                    >
                      <FaGithub />
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          <div
            className="
          bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center
          "
          >
            <Image
              src="/logo.svg"
              alt="Meet.AI Logo"
              className="h-[92px] w-[92px]"
              width={92}
              height={92}
            />
            <p className="text- font-semibold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
