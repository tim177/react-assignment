"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export function UserForm() {
  const [formData, setFormData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [initialData, setInitialData] = useState<UserData>(formData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setInitialData(parsedData);
    } else {
      const newId = crypto.randomUUID();
      setFormData((prev) => ({ ...prev, id: newId }));
      setInitialData((prev) => ({ ...prev, id: newId }));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (JSON.stringify(formData) !== JSON.stringify(initialData)) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formData, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    setInitialData(formData);
    toast.success("User data saved successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 60 },
  });

  const handleCloseAttempt = () => {
    if (JSON.stringify(formData) !== JSON.stringify(initialData)) {
      setIsDialogOpen(true);
    }
  };

  return (
    <animated.div style={formAnimation}>
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-medium text-white">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white focus:ring-2 focus:ring-white"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-medium text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white focus:ring-2 focus:ring-white"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-lg font-medium text-white">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white focus:ring-2 focus:ring-white"
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-lg font-medium text-white"
              >
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white focus:ring-2 focus:ring-white"
                placeholder="123 Main St, City, Country"
              />
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="submit"
                className="bg-white text-purple-600 hover:bg-white/90 text-lg font-semibold py-2 px-6"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                onClick={handleCloseAttempt}
              >
                Close
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to close the form?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setFormData(initialData);
                setIsDialogOpen(false);
              }}
            >
              Close Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </animated.div>
  );
}
