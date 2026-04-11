"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  function linkClass(href: string) {
    const isActive = pathname === href;
    return `text-sm transition-colors focus-visible:outline-none focus-visible:underline ${
      isActive ? "text-black font-semibold" : "text-gray-600 hover:text-black"
    }`;
  }

  return (
    <>
      <Link href="/" className={linkClass("/")}>
        Home
      </Link>
      <Link href="/search" className={linkClass("/search")}>
        Search
      </Link>
    </>
  );
}

export function NavLinksSkeleton() {
  return (
    <>
      <span className="text-sm text-gray-600">Home</span>
      <span className="text-sm text-gray-600">Search</span>
    </>
  );
}
