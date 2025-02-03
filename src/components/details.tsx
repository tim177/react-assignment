"use client";

import { useRef, useState } from "react";
import {
  Parallax,
  ParallaxLayer,
  type IParallax,
} from "@react-spring/parallax";
import Link from "next/link";
import { Counter } from "@/components/counter";
import { UserForm } from "@/components/user-form";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function Details() {
  const parallax = useRef<IParallax>(null!);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFormVisible, setIsFormVisible] = useState(true);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "var(--background)",
      }}
    >
      <div className="fixed top-4 left-4 z-10">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="w-full max-w-4xl p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Counter</h1>
            <Counter />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="w-full max-w-4xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">User Form</h2>
            {isFormVisible && <UserForm />}
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="w-full max-w-4xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Rich Text Editor
            </h2>
            <RichTextEditor />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
