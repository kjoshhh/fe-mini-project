"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ticket, CalendarPlus } from "lucide-react";
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

interface NavbarProps {
  className?: string;
  variant?: "transparent" | "solid-light" | "solid-dark";
}

export default function Navbar({ className, variant = "transparent" }: NavbarProps) {
  const { isLoggedIn, logout, isAuthChecked, user, switchRole } = useAuth();
  const [isSwitching, setIsSwitching] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Navbar styling
  const navbarClasses =
    variant === "transparent"
      ? "fixed z-50 bg-black/10 backdrop-blur-sm bg-opacity-30 border-b border-white/10"
      : variant === "solid-dark"
        ? "relative z-0 bg-black text-white border-b border-black/20"
        : "relative z-0 bg-white text-black border-b border-gray-200";

  // Button styles
  const buttonPrimary =
    variant === "solid-dark"
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-black text-white hover:bg-gray-800";

  const buttonGhost =
    variant === "solid-dark"
      ? "border border-white text-white hover:bg-white hover:text-black"
      : "border border-black text-black hover:bg-black hover:text-white";

  const buttonTransparent =
    "bg-white/10 backdrop-blur-md border border-white text-white hover:bg-white hover:text-black";

  return (
    <div className={`top-0 left-0 w-full ${navbarClasses} ${className ?? ""}`}>
      <div className="relative max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 z-10">
          <span
            className={`font-bold text-2xl transition-colors ${variant === "transparent" ? "text-white" : "text-inherit"
              }`}
          >
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
                    className={
                      variant === "transparent" ? buttonTransparent : buttonGhost
                    }
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    My Ticket
                  </Button>
                </Link>
              )}

              {user?.role === "ORGANIZER" && (
                <Link href="/dashboard/organizer/create-event" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    className={
                      variant === "transparent" ? buttonTransparent : buttonGhost
                    }
                  >
                    <CalendarPlus className="h-4 w-4 mr-2 cursor-pointer" />
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
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user?.username || "U"
                          )}`
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
                        <Link href="/dashboard/organizer/create-event" className="w-full cursor-pointer">
                          Create Event
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/dashboard/organizer/my-events" className="w-full cursor-pointer">
                          My Events
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/dashboard/organizer/events/1/attendes" className="w-full cursor-pointer">
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
                <Button
                  className={
                    variant === "transparent" ? buttonTransparent : buttonPrimary
                  }
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  className={
                    variant === "transparent" ? buttonTransparent : buttonGhost
                  }
                >
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
