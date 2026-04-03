import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-black">
            ▲ Swag Store
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            Home
          </Link>
          <Link
            href="/search"
            className="text-sm text-gray-600 hover:text-black"
          >
            Search
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Cart indicator goes here */}
        </div>
      </nav>
    </header>
  );
}
