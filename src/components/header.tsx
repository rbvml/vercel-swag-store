import Link from "next/link";
import { Suspense } from "react";
import NavLinks, { NavLinksSkeleton } from "./nav-links";

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-black">
            ▲ Swag Store
          </Link>
          <Suspense fallback={<NavLinksSkeleton />}>
            <NavLinks />
          </Suspense>
        </div>
        <div className="flex items-center gap-4">{children}</div>
      </nav>
    </header>
  );
}
