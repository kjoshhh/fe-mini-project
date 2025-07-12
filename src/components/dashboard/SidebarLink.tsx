"use client";

import Link from "next/link";
import clsx from "clsx";

interface Props {
    href: string;
    label: string;
    active?: boolean;
}

export default function SidebarLink({ href, label, active = false }: Props) {
    return (
        <li>
            <Link
                href={href}
                className={clsx(
                    "block px-4 py-2 rounded hover:bg-gray-200 transition",
                    active && "bg-gray-300 font-semibold"
                )}
            >
                {label}
            </Link>
        </li>
    );
}
