"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    referralCode?: string;
}

export default function SignUp() {
    const router = useRouter();

    const inputUserNameRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const inputReferralCodeRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const signUP = async (payload: RegisterPayload) => {
        const res = await axios.post("http://localhost:3030/auth/regis", payload);
        return res.data;
    };

    const btnSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const username = inputUserNameRef.current?.value;
            const email = inputEmailRef.current?.value;
            const password = inputPasswordRef.current?.value;
            const referralCode = inputReferralCodeRef.current?.value;

            if (!username || !email || !password) {
                toast.warning("Please fill in all required fields.");
                return;
            }

            const payload = {
                username,
                email,
                password,
                referralCode: referralCode || undefined,
            };

            setLoading(true);
            await signUP(payload);
            toast.success("Sign Up successful! Check your email for verification.");
            router.replace("/sign-in");
        } catch (err: any) {
            const errorMessage =
                err?.response?.data?.error?.toLowerCase() || err?.message?.toLowerCase() || "";

            if (errorMessage.includes("email") && errorMessage.includes("already")) {
                toast.error("Email is already registered. Please use another one.");
            } else {
                toast.error(`Sign Up failed: ${err?.response?.data?.error ?? err?.message ?? "Unknown error"}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="
                        min-h-screen min-w-screen 
                        bg-[url('/assets/bg-signup.jpg')] bg-cover bg-center
                        flex items-center justify-center 
                        px-4
                        ">
            <div className="bg-white/70 w-full max-w-md p-8 rounded-md shadow-lg space-y-6">
                <h1 className="text-3xl font-bold text-black text-center uppercase">
                    Create your account
                </h1>

                <form className="space-y-4" onSubmit={btnSignUp}>
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="username" className="text-sm font-medium text-black">
                            Username
                        </Label>
                        <Input
                            id="username"
                            ref={inputUserNameRef}
                            placeholder="Enter your username"
                            className="bg-white/90 text-black"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="email" className="text-sm font-medium text-black">
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            ref={inputEmailRef}
                            placeholder="Enter your email"
                            className="bg-white/90 text-black"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="password" className="text-sm font-medium text-black">
                            Password
                        </Label>
                        <div className="flex items-center gap-2">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                ref={inputPasswordRef}
                                placeholder="Enter your password"
                                className="bg-white/90 text-black flex-1"
                            />
                            <Button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-2 cursor-pointer"
                            >
                                {showPassword ? <Eye size={10} /> : <EyeOff size={10} />}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="referralCode" className="text-sm font-medium text-black">
                            Referral Code (optional)
                        </Label>
                        <Input
                            id="referralCode"
                            ref={inputReferralCodeRef}
                            placeholder="Input your referral code"
                            className="bg-white/90 text-black"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-1/2 mx-auto mt-6 flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-700 hover:text-white transition"
                    >
                        {loading && <Loader2 className="animate-spin w-4 h-4" />}
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                </form>

                <p className="text-center text-sm text-black">
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="text-blue-800 hover:underline hover:text-blue-200"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
