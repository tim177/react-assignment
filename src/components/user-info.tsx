"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-muted-foreground">john.doe@example.com</p>
          <p className="text-muted-foreground">Member since: Jan 1, 2023</p>
          <p className="text-muted-foreground">Last login: 2 hours ago</p>
        </div>
      </CardContent>
    </Card>
  );
}
