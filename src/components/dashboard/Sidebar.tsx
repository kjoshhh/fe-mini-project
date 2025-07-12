"use client";

import { usePathname } from "next/navigation";
import SidebarLink from "./SidebarLink";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();
    const pathname = usePathname();

    const isCustomer = user?.role === "CUSTOMER";
    const isOrganizer = user?.role === "ORGANIZER";

    return (
        <aside
            className="fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-white border-r px-4 py-6 overflow-y-auto"
        >
            <ul className="space-y-2">
                {/* Umum */}
                <SidebarLink
                    href="/dashboard"
                    label="Dashboard"
                    active={pathname === "/dashboard"}
                />
                <SidebarLink
                    href="/dashboard/profile"
                    label="Profile"
                    active={pathname === "/dashboard/profile"}
                />

                {/* Role: CUSTOMER */}
                {isCustomer && (
                    <>
                        <SidebarLink
                            href="/dashboard/event"
                            label="Event"
                            active={pathname === "/dashboard/event"}
                        />
                        <SidebarLink
                            href="/dashboard/my-tickets"
                            label="My Tickets"
                            active={pathname === "/dashboard/my-tickets"}
                        />
                        <SidebarLink
                            href="/dashboard/vouchers"
                            label="Vouchers"
                            active={pathname === "/dashboard/vouchers"}
                        />
                    </>
                )}

                {/* Role: ORGANIZER */}
                {isOrganizer && (
                    <>
                        <SidebarLink
                            href="/dashboard/create-event"
                            label="Create Event"
                            active={pathname === "/dashboard/create-event"}
                        />
                        <SidebarLink
                            href="/dashboard/my-events"
                            label="My Events"
                            active={pathname === "/dashboard/my-events"}
                        />
                        <SidebarLink
                            href="/dashboard/attendees"
                            label="Attendees"
                            active={pathname === "/dashboard/my-events"}
                        />
                    </>
                )}
            </ul>
        </aside>
    );
}
