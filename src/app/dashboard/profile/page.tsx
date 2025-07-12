"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                Your Profile
            </h1>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
            <p>Role: {user?.role}</p>
            <p>Referral Code: {user?.referralCode}</p>
        </div>
    )
}