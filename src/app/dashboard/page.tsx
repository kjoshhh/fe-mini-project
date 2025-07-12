"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardHome() {
    const { user } = useAuth();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">
                {user ? `Welcome ${user.username}, to your Dashboard` : "Welcome to Dashboard"}
            </h1>
        </div>
    )
}