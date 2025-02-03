"use client";

import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Bold, Italic, List, Underline } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

export function RichTextEditor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = useState("");
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  // Ensures component is mounted before animating
  useEffect(() => {
    setMounted(true);
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Executes text formatting using modern approach
  const applyFormat = (command: string) => {
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      document.execCommand(command, false); // Still used for backward compatibility
    }
  };

  // Handles input change and saves to localStorage
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    localStorage.setItem("editorContent", newContent);
  };

  // Spring animation that starts only after mounting
  const editorAnimation = useSpring({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.div style={editorAnimation}>
      <Card>
        <CardHeader>
          <div className="flex gap-2 mt-4">
            <Toggle
              onClick={() => applyFormat("bold")}
              className="bg-white/10 text-white hover:bg-white/20 data-[state=on]:bg-white/30"
            >
              <Bold className="h-5 w-5" />
            </Toggle>
            <Toggle
              onClick={() => applyFormat("italic")}
              className="bg-white/10 text-white hover:bg-white/20 data-[state=on]:bg-white/30"
            >
              <Italic className="h-5 w-5" />
            </Toggle>
            <Toggle
              onClick={() => applyFormat("underline")}
              className="bg-white/10 text-white hover:bg-white/20 data-[state=on]:bg-white/30"
            >
              <Underline className="h-5 w-5" />
            </Toggle>
            <Toggle
              onClick={() => applyFormat("insertUnorderedList")}
              className="bg-white/10 text-white hover:bg-white/20 data-[state=on]:bg-white/30"
            >
              <List className="h-5 w-5" />
            </Toggle>
          </div>
        </CardHeader>
        <CardContent>
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[250px] rounded-md border border-white/20 bg-white/10 p-4 text-white focus:outline-none focus:ring-2 focus:ring-white overflow-y-auto"
            onInput={handleInput}
            dir="ltr"
          />
        </CardContent>
      </Card>
    </animated.div>
  );
}
