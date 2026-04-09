import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-gray-600">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 active:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        Back to homepage
      </Link>
    </div>
  );
}
