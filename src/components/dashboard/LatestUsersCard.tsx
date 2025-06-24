"use client";

import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const users = [
    {
        name: "Daniel Orwenjo",
        email: "daniel@example.com",
        phone: "+254712345678",
        bio: "CTO at Danamo",
    },
    {
        name: "Maureen Wambui",
        email: "maureen@example.com",
        phone: "+254798765432",
        bio: "Project Manager",
    },
    {
        name: "John Doe",
        email: "john@example.com",
        phone: "+254700000000",
        bio: "UI/UX Designer",
    },
    {
        name: "Janet Muema",
        email: "janet@example.com",
        phone: "+254711111111",
        bio: "Backend Engineer",
    },
    {
        name: "Extra User",
        email: "extra@example.com",
        phone: "+254799999999",
        bio: "Overflow Test",
    },
];

export function LatestUsersCard() {
    return (
        <Card className="relative pb-20">
            <CardHeader>
                <CardTitle>Latest Users</CardTitle>
                <CardDescription>Recent signups</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <table className="w-full text-sm table-auto border-collapse">
                    <thead className="text-muted-foreground text-left">
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Phone</th>
                            <th className="py-2">Bio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.slice(0, 4).map((user, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="py-2 px-2">{user.name}</td>
                                <td className="py-2 px-2">{user.email}</td>
                                <td className="py-2 px-2">{user.phone}</td>
                                <td className="py-2">{user.bio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
            <CardFooter className="absolute bottom-4 left-0 w-full px-4">
                <Button asChild className="ml-auto">
                    <Link href="/dashboard/users">View All</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}