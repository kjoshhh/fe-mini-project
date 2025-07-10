"use client";

import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRef, useState } from "react";

export default function resetPassword() {
    const inputNewPasswordRef = useRef<HTMLInputElement>(null);
    const [showNewPassword, setShowNewPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 w-full max-w-md p-8 rounded-sm shadow-xl shadow-white/8 space-y-6">
                <h1 className="text-2xl font-bold text-white text-center uppercase">
                    Input New Password
                </h1>

                <form className="space-y-4 flex flex-col">
                    <div className="flex flex-col space-y-1">
                        <Label className="text-sm font-medium text-white">
                            New Password
                        </Label>
                        <div className="flex items-center gap-2">
                            <Input
                                type={showNewPassword ? "text" : "password"}
                                id="password"
                                ref={inputNewPasswordRef}
                                placeholder="Input your password"
                                className="p-2 rounded-md bg-white/90 text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <Button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="p-2"
                            >
                                {showNewPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                            </Button>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="cursor-pointer w-1/2 flex mx-auto py-2 mt-4 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200"
                    >
                        Reset
                    </Button>
                </form>
            </div>
        </div>
    )
}