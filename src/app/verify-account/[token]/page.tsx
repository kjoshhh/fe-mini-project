"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyAccountPage() {
    const { token } = useParams();
    const router = useRouter();
    const [status, setStatus] = useState("Verifying your account...");

    useEffect(() => {
        const verify = async () => {
            try {
                await axios.get(`http://localhost:3030/auth/verify`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStatus("✅ Email verified! Redirecting to Sign In...");
                setTimeout(() => {
                    router.push("/sign-in");
                }, 2000);
            } catch (err: any) {
                setStatus("❌ Invalid or expired token.");
            }
        };

        if (typeof token === "string") {
            verify();
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <p className="text-xl">{status}</p>
        </div>
    );
}
