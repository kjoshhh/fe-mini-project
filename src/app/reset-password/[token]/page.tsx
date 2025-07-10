"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || window.location.pathname.split("/").pop();

    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPassword = inputRef.current?.value;

        if (!newPassword) {
            toast.warning("Please enter your new password.");
            return;
        }

        try {
            setLoading(true);
            await axios.post("http://localhost:3030/auth/reset-password", {
                token,
                newPassword,
            });

            toast.success("Password updated successfully.");
            router.replace("/sign-in");
        } catch (err: any) {
            toast.error(err?.response?.data?.error ?? "Reset failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 w-full max-w-md p-8 rounded-md shadow-lg space-y-6">
                <h1 className="text-2xl font-bold text-white text-center uppercase">
                    Reset Your Password
                </h1>

                <form onSubmit={handleReset} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            ref={inputRef}
                            placeholder="Enter your password"
                            className="bg-white/90 text-black flex-1"
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-2 cursor-pointer"
                        >
                            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                        </Button>

                    </div>

                    <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
