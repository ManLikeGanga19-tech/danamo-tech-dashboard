"use client"

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
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
    { name: "Overview", href: "/dashboard/overview" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Newsletter subscriptions", href: "/dashboard/newsletter" },
    { name: "Job Applications", href: "/dashboard/job-applications" },
    { name: "Blogs", href: "/dashboard/blogs" },
    { name: "webinars", href: "/dashboard/webinars" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-background text-foreground p-4 space-y-4 sticky top-0 h-screen overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Danamo tech</h2>
                    {mounted && (
                        <button
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
                    <NavigationMenuList className="flex flex-col space-y-2">
                        {links.map((link) => (
                            <NavigationMenuItem key={link.name}>
                                <NavigationMenuLink
                                    asChild
                                    className={cn(
                                        "block px-4 py-2 rounded transition",
                                        pathname === link.href
                                            ? "bg-muted font-medium"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    <Link href={link.href}>{link.name}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-background text-foreground">
                {children}
            </main>
        </div>
    );
}
