import Link from "next/link";
import { getCart } from "@/lib/cart";

export default async function CartIndicator() {
  const cart = await getCart();
  const count = cart?.totalItems ?? 0;

  return (
    <Link
      href="/cart"
      className="relative flex items-center text-gray-600 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {count > 0 && (
        <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs font-medium text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export function CartIndicatorSkeleton() {
  return <div className="h-5 w-8" />;
}
