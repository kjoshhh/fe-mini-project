"use client";

import { useAuth } from "@/context/AuthContext";
import { useRef, useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignInPayload {
    email: string;
    password: string;
}

export default function SignIn() {
    const router = useRouter();
    const { login } = useAuth();

    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  

    const signIn = async (payload: SignInPayload) => {
        const res = await axios.post("http://localhost:3030/auth/login", payload);
        return res.data;
    };

    const btnSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const email = inputEmailRef.current?.value;
            const password = inputPasswordRef.current?.value;
            

            if (!email || !password) {
                toast.warning("Please fill in all fields.");
                return;
            }

            setLoading(true);
            const res = await signIn({ email, password });

            toast.success("Login successful!");

            // Simpan token ke localStorage atau cookie
            localStorage.setItem("token", res.token);

            // panggil login dari authcontext
            login(res.token)

            // Redirect ke halaman dashboard atau home
            router.replace("/");
        } catch (err: any) {
            const errorMessage =
                err?.response?.data?.error?.toLowerCase() || err?.message?.toLowerCase() || "";

            if (errorMessage.includes("invalid") || errorMessage.includes("not found")) {
                toast.error("Invalid email or password.");
            } else if (errorMessage.includes("not verified")) {
                toast.error("Your email is not verified. Please verify your account.");
            } else {
                toast.error(`Sign In failed: ${err?.response?.data?.error ?? err?.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="
                        min-h-screen min-w-screen 
                        bg-[url('/assets/bg-signin.jpg')] bg-cover bg-center
                        flex items-center justify-center 
                        px-4
                        ">
            <div className="bg-white/50 w-full max-w-md p-8 rounded-md shadow-lg space-y-6">
                <h1 className="text-3xl font-bold text-black text-center uppercase">
                    Welcome Back
                </h1>

                <form className="space-y-4" onSubmit={btnSignIn}>
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
                                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                            </Button>

                        </div>
                        <Link
                            href="/forget-password"
                            className="text-blue-800 hover:underline hover:text-black text-center relative top-2"
                        >
                            Forgot Password
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-1/2 mx-auto mt-6 flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-700 hover:text-white transition cursor-pointer"
                    >
                        {loading && <Loader2 className="animate-spin w-4 h-4" />}
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <p className="text-center text-sm text-black">
                    Don’t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="text-blue-800 hover:underline hover:text-black"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
