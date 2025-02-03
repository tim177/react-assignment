"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignIn() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Sign in to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="text-red-500 text-sm mb-2">
            Authentication failed. Please try again.
          </p>
        )}
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full"
        >
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
}
