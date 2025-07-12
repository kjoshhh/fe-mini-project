"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ticket, User } from "lucide-react";
import { CalendarPlus } from 'lucide-react';
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const { isLoggedIn, logout, isAuthChecked, user, switchRole } = useAuth();
    const [isSwitching, setIsSwitching] = useState(false);
    const pathname = usePathname();
    const isActive = pathname === "/"


    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm bg-opacity-30 border-b border-white/10">
            <div className="relative max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 z-10">
                    <span className={`font-bold text-2xl transition-colors ${isActive ? "text-white" : "text-black"}`}>
                        EventTix
                    </span>
                </Link>

                {/* Search Bar */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari event, konser, pertandingan..."
                            className="pl-10 bg-input-background"
                        />
                    </div>
                </div>

                {/* Right Section: Sign In/Up or Profile & Ticket */}
                <div className="flex gap-4 items-center">
                    {!isAuthChecked ? null : isLoggedIn ? (
                        <>
                            {user?.role === "CUSTOMER" && (
                                <>
                                    < Link href="/my-tickets">
                                        <Button
                                            variant="ghost"
                                            className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black cursor-pointer"
                                        >
                                            <Ticket className="h-5 w-5 mr-2" />
                                            My Ticket
                                        </Button>
                                    </Link>
                                </>
                            )}

                            {user?.role === "ORGANIZER" && (
                                <>
                                    < Link href="/create-event">
                                        <Button
                                            variant="ghost"
                                            className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black cursor-pointer"
                                        >
                                            <CalendarPlus />
                                            Create Event
                                        </Button>
                                    </Link>
                                </>
                            )}


                            {/* Circle Profile Button */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full w-10 h-10 p-0 bg-white/20 hover:bg-white/30 cursor-pointer">
                                        <User className="h-5 w-5 text-white cursor-pointer" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-white text-black shadow-md">

                                    {/* Link Umum */}
                                    <DropdownMenuItem>
                                        <Link href="/dashboard/profile" className="w-full">Profile</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    {user?.role === "CUSTOMER" && (
                                        <>
                                            {/* CUSTOMER only */}
                                            <DropdownMenuItem>
                                                <Link href="/" className="w-full">Event</Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem>
                                                <Link href="/" className="w-full">My Ticket</Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem>
                                                <Link href="/" className="w-full">Vouchers</Link>
                                            </DropdownMenuItem>

                                            {/* 🔁 Tombol Switch ke Organizer */}
                                            <DropdownMenuItem
                                                onClick={async () => {
                                                    setIsSwitching(true);
                                                    try {
                                                        await switchRole();
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error("Failed to switch role:", error);
                                                    } finally {
                                                        setIsSwitching(false)
                                                    }

                                                }}
                                                disabled={isSwitching}
                                                className="font-light text-blue-600 cursor-pointer"
                                            >
                                                Masuk sebagai Organizer
                                            </DropdownMenuItem>
                                        </>
                                    )}

                                    {user?.role === "ORGANIZER" && (
                                        <>
                                            {/* ORGANIZER only */}
                                            <DropdownMenuItem>
                                                <Link href="" className="w-full">Dashboard</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="" className="w-full">Create Event</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="" className="w-full">My Events</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="" className="w-full">Attendees</Link>
                                            </DropdownMenuItem>

                                            {/* 🔁 Tombol Switch ke Customer */}
                                            <DropdownMenuItem
                                                onClick={async () => {
                                                    setIsSwitching(true);
                                                    try {
                                                        await switchRole();
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error("Failed to switch role:", error);
                                                    } finally {
                                                        setIsSwitching(false)
                                                    }
                                                }}
                                                disabled={isSwitching}
                                                className="font-light text-blue-600 cursor-pointer"
                                            >
                                                {isSwitching ? "Mengalihkan peran..." : "Masuk sebagai Customer"}
                                            </DropdownMenuItem>
                                        </>
                                    )}

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onClick={() => {
                                            logout();
                                            window.location.href = "/";
                                        }}
                                        className="text-red-500 font-semibold cursor-pointer"
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>

                            </DropdownMenu>


                        </>
                    ) : (
                        <>
                            {/* Sign Up */}
                            <Link href="/sign-up">
                                <Button className="bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition font-semibold px-4 py-2 rounded-md cursor-pointer">
                                    Sign Up
                                </Button>
                            </Link>

                            {/* Sign In */}
                            <Link href="/sign-in">
                                <Button className="bg-white text-black border border-white/30 hover:bg-white/10 hover:text-white hover:backdrop-blur-md transition font-semibold px-4 py-2 rounded-md cursor-pointer">
                                    Sign In
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}
