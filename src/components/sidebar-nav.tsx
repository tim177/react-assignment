"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart2, DotIcon as Counter, User } from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart2,
  },
  {
    title: "Counter",
    href: "/counter",
    icon: Counter,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {sidebarItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
