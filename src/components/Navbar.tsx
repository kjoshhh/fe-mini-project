"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ticket, CalendarPlus } from "lucide-react";
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

interface NavbarProps{
    className?: string;
}

export default function Navbar({className}: NavbarProps) {
    const { isLoggedIn, logout, isAuthChecked, user, switchRole } = useAuth();
    const [isSwitching, setIsSwitching] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/"


    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm bg-opacity-30 border-b border-white/10">
            <div className="relative max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 z-10">
                    <span className={`font-bold text-2xl transition-colors ${isHome ? "text-white" : "text-black"}`}>
                        EventTix
                    </span>
                </Link>


                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {!isAuthChecked ? null : isLoggedIn ? (
                        <>
                            {user?.role === "CUSTOMER" && (
                                <Link href="/dashboard/customer/my-tickets" className="hidden sm:block">
                                    <Button
                                        variant="ghost"
                                        className="bg-white/10 backdrop-blur-md border border-white text-white hover:bg-white hover:text-black"
                                    >
                                        <Ticket className="h-4 w-4 mr-2" />
                                        My Ticket
                                    </Button>
                                </Link>
                            )}

                            {user?.role === "ORGANIZER" && (
                                <Link href="/create-event" className="hidden sm:block">
                                    <Button
                                        variant="ghost"
                                        className="bg-white/10 backdrop-blur-md border border-white text-white hover:bg-white hover:text-black"
                                    >
                                        <CalendarPlus className="h-4 w-4 mr-2" />
                                        Create Event
                                    </Button>
                                </Link>
                            )}

                            {/* Profile */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full w-10 h-10 p-0 bg-white/20 hover:bg-white/30 cursor-pointer">
                                        <img
                                            src={
                                                user?.profileImg
                                                    ? `${user.profileImg}?v=${Date.now()}`
                                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || "U")}`
                                            }
                                            alt="Profile"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    side="bottom"
                                    align="end"
                                    className="w-48 bg-white text-black shadow-lg"
                                >
                                    <DropdownMenuItem>
                                        <Link href="/dashboard/profile" className="w-full">
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    {user?.role === "CUSTOMER" && (
                                        <>
                                            <DropdownMenuItem>
                                                <Link href="/dashboard/customer/events" className="w-full">
                                                    Event
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="/dashboard/customer/my-tickets" className="w-full">
                                                    My Ticket
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="/dashboard/coupons" className="w-full">
                                                    Vouchers
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={async () => {
                                                    setIsSwitching(true);
                                                    try {
                                                        await switchRole();
                                                        window.location.reload();
                                                    } catch (err) {
                                                        console.error(err);
                                                    } finally {
                                                        setIsSwitching(false);
                                                    }
                                                }}
                                                disabled={isSwitching}
                                                className="text-blue-600"
                                            >
                                                {isSwitching ? "Mengalihkan peran..." : "Masuk sebagai Organizer"}
                                            </DropdownMenuItem>
                                        </>
                                    )}

                                    {user?.role === "ORGANIZER" && (
                                        <>
                                            <DropdownMenuItem>
                                                <Link href="/dashboard/create-event" className="w-full">
                                                    Create Event
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="/dashboard/my-events" className="w-full">
                                                    My Events
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="/dashboard/attendees" className="w-full">
                                                    Attendees
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={async () => {
                                                    setIsSwitching(true);
                                                    try {
                                                        await switchRole();
                                                        window.location.reload();
                                                    } catch (err) {
                                                        console.error(err);
                                                    } finally {
                                                        setIsSwitching(false);
                                                    }
                                                }}
                                                disabled={isSwitching}
                                                className="text-blue-600"
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
                            <Link href="/sign-up">
                                <Button className="bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition font-semibold px-4 py-2 rounded-md cursor-pointer">
                                    Sign Up
                                </Button>
                            </Link>
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
