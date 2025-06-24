"use client";

import { ChartAreaInteractive } from "@/components/dashboard/ChartAreaInteractive";
import { ChartBarMixed } from "@/components/dashboard/ChartBarBrowser";
import { LatestUsersCard } from "@/components/dashboard/LatestUsersCard";

export default function OverviewPage() {
    return (
        <div className="space-y-6">
            <ChartAreaInteractive />

            {/* Smaller Chart Below */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartBarMixed />
                <LatestUsersCard />

            </div>
        </div>
    );
}
