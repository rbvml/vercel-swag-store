"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  function linkClass(href: string) {
    const isActive = pathname === href;
    return `text-sm transition-colors focus-visible:outline-none focus-visible:underline ${
      isActive ? "text-black font-medium" : "text-gray-600 hover:text-black"
    }`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-black">
            ▲ Swag Store
          </Link>
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/search" className={linkClass("/search")}>
            Search
          </Link>
        </div>
        <div className="flex items-center gap-4">{children}</div>
      </nav>
    </header>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="sticky top-0 z-50 h-[57px] border-b border-gray-200 bg-white" />
  );
}
