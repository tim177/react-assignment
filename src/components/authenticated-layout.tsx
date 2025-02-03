"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export function AuthenticatedLayout({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/signin");
  }

  return <>{children}</>;
}
