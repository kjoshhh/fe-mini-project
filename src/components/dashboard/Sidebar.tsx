"use client";

import { usePathname } from "next/navigation";
import SidebarLink from "./SidebarLink";
import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { user } = useAuth();
    const pathname = usePathname();

    const isCustomer = user?.role === "CUSTOMER";
    const isOrganizer = user?.role === "ORGANIZER";

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-14 left-0 z-40 w-64 h-[calc(100vh-56px)] bg-white border-r px-4 py-6 shadow-md overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
        `}
            >
                {/* Tombol close (mobile only) */}
                <div className="sm:hidden flex justify-end mb-4">
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        <X />
                    </button>
                </div>

                <h2 className="text-sm font-bold text-gray-500 uppercase mb-4 px-2">Menu Utama</h2>

                <ul className="space-y-1 text-sm">
                    <SidebarLink
                        href="/dashboard/profile"
                        label="Dashboard / Profile"
                        active={pathname === "/dashboard/profile"}
                    />

                    {isCustomer && (
                        <>
                            <h3 className="text-xs text-gray-400 uppercase mt-4 px-2">Customer</h3>
                            <SidebarLink
                                href="/dashboard/customer/events"
                                label="Events"
                                active={pathname === "/dashboard/customer/events"}
                            />
                            <SidebarLink
                                href="/dashboard/customer/my-tickets"
                                label="My Tickets"
                                active={pathname === "/dashboard/customer/my-tickets"}
                            />
                            <SidebarLink
                                href="/dashboard/coupons"
                                label="Vouchers"
                                active={pathname === "/dashboard/vouchers"}
                            />
                        </>
                    )}

                    {isOrganizer && (
                        <>
                            <h3 className="text-xs text-gray-400 uppercase mt-4 px-2">Organizer</h3>
                            <SidebarLink
                                href="/dashboard/organizer/create-event"
                                label="Create Event"
                                active={pathname === "/dashboard/organizer/create-event"}
                            />
                            <SidebarLink
                                href="/dashboard/organizer/my-events"
                                label="My Events"
                                active={pathname === "/dashboard/organizer/my-events"}
                            />
                            <SidebarLink
                                href="/dashboard/organizer/events/1/attendes"
                                label="Attendes"
                                active={pathname === "/dashboard/organizer/events/1/attendes"}
                            />
                            <SidebarLink
                                href="/dashboard/organizer/events/1/statistics"
                                label="Statistics"
                                active={pathname === "/dashboard/organizer/events/1/statistics"}
                            />
                        </>
                    )}
                </ul>
            </aside>
        </>
    );
}
