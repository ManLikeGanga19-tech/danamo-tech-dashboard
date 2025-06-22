// app/dashboard/layout.tsx
"use client"

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const links = [
    { name: "Overview", href: "/dashboard/overview" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Add User", href: "/dashboard/add-user" },
    { name: "Newsletter subscriptions", href: "/dashboard/newsletter" },
    { name: "Job Applications", href: "/dashboard/job-applications" },


];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 space-y-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Danamo tech</h2>
                <NavigationMenu>
                    <NavigationMenuList className="flex flex-col space-y-2">
                        {links.map(link => (
                            <NavigationMenuItem key={link.name}>
                                <Link href={link.href} passHref legacyBehavior>
                                    <NavigationMenuLink
                                        className={cn(
                                            "block px-4 py-2 rounded transition",
                                            pathname === link.href
                                                ? "bg-blue-500 text-white"
                                                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        {link.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-white dark:bg-black">
                {children}
            </main>
        </div>
    );
}
