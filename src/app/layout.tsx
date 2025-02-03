import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SidebarNav } from "@/components/sidebar-nav";
import "./globals.css";
import type React from "react";
import { Navbar } from "@/components/navbar";
import SessionProviderWrapper from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
              <Navbar />
              <div className="flex flex-1">
                <div className="hidden border-r border-gray-800 md:block md:w-64 md:p-6">
                  <SidebarNav />
                </div>
                <div className="flex-1 p-8">{children}</div>
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
