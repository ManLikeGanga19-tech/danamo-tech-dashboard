"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
    Moon,
    Sun,
    LayoutDashboard,
    Users,
    Mail,
    FileText,
    BookOpenCheck,
    Video,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const links = [
    { name: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Newsletter subscriptions", href: "/dashboard/newsletter", icon: Mail },
    { name: "Job Applications", href: "/dashboard/job-applications", icon: FileText },
    { name: "Blogs", href: "/dashboard/blogs", icon: BookOpenCheck },
    { name: "Webinars", href: "/dashboard/webinars", icon: Video },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-background text-foreground p-4 space-y-4 sticky top-0 h-screen overflow-y-auto relative">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Danamo Tech</h2>
                    {mounted && (
                        <button
                            onClick={() =>
                                setTheme(resolvedTheme === "dark" ? "light" : "dark")
                            }
                            className="p-2 rounded hover:bg-muted transition"
                            aria-label="Toggle theme"
                        >
                            {resolvedTheme === "dark" ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-800" />
                            )}
                        </button>
                    )}
                </div>

                <NavigationMenu>
                    <NavigationMenuList className="flex flex-col space-y-2 items-start w-full text-sm">
                        {links.map((link) => (
                            <NavigationMenuItem key={link.name} className="w-full">
                                <NavigationMenuLink
                                    asChild
                                    className={cn(
                                        "flex items-center justify-start gap-3 w-full px-3 py-2 rounded transition text-left",
                                        pathname === link.href
                                            ? "bg-muted font-semibold"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    <Link href={link.href}>
                                        <div className="flex items-center w-full gap-3">
                                            <link.icon className="w-4 h-4 shrink-0" />
                                            <hr className="h-5 w-[1px] bg-muted-foreground opacity-50" />
                                            <span className="truncate">{link.name}</span>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Auth Actions Dropdown */}
                <div className="absolute bottom-4 left-4 right-4">
                    <Select onValueChange={(value) => {
                        if (value === "logout") {
                            console.log("Logging out...");
                        }
                        if (value === "profile") {
                            router.push('/dashboard/profile') 
                        }
                        if (value === "account"){
                            router.push('/dashboard/account')
                        }
                    }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Admin User" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="account">Account</SelectItem>
                            <SelectItem value="profile">Profile</SelectItem>
                            <SelectItem value="logout">Log Out</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-background text-foreground">
                {children}
            </main>
        </div>
    );
}
