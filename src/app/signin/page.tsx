"use client";

import { Suspense } from "react";
import { SignIn } from "./signIn";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
}
