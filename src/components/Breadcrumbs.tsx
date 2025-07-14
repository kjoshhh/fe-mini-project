"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((seg) => seg !== "");

  // helper untuk format teks
  const formatLabel = (text: string) =>
    text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <nav className="bg-white text-black py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/">
            <Home className="w-4 h-4" />
          </Link>
          {segments.length > 0 && <ChevronRight className="w-4 h-4" />}
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");

            const isLast = index === segments.length - 1;

            return (
              <div key={index} className="flex items-center space-x-2">
                {isLast ? (
                  <span className="text-gray-400">{formatLabel(segment)}</span>
                ) : (
                  <>
                    <Link href={href} className="hover:underline">
                      {formatLabel(segment)}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
