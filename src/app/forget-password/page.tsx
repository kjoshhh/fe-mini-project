"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

export default function ForgetPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value?.trim();

        if (!email) {
            toast.warning("Please enter your email.");
            return;
        }

        try {
            setLoading(true);
            await axios.post("http://localhost:3030/auth/reset-password-request", { email });

            toast.success("Reset link sent. Please check your email.");

            if (emailRef.current) {
                emailRef.current.value = "";
            }

            router.replace("/sign-in")
        } catch (err: any) {
            const error = err?.response?.data?.error ?? err?.message ?? "Something went wrong.";
            toast.error(error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="
                        min-h-screen min-w-screen 
                        bg-[url('/assets/bg-forget-password.jpg')] bg-cover bg-center
                        flex items-center justify-center 
                        px-4 
                        ">
            <div className="bg-white/70 w-full max-w-md p-8 rounded-md shadow-lg space-y-6">
                <p className="text-black text-sm text-center">
                    Enter your email and we’ll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="email" className="text-sm font-medium text-black">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="example@mail.com"
                            ref={emailRef}
                            className="bg-white/90 text-black border border-black border-2"
                        />
                    
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="flex mx-auto items-center justify-center cursor-pointer w-60 bg-white text-gray-900 font-semibold rounded-md hover:bg-black/80 hover:text-white transition"
                    >
                        {loading ? "Sending..." : "Submit"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
