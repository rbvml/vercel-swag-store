import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getCart } from "@/lib/cart";
import CartItem from "@/components/cart-item";

export const metadata: Metadata = {
  title: "Cart",
};

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

async function CartContents() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="py-12">
        <p className="text-gray-500">Your cart is empty.</p>
        <Link
          href="/search"
          className="mt-6 inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 active:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div>
        {cart.items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
        <span className="text-lg font-medium">Subtotal</span>
        <span className="text-lg font-bold">
          {formatPrice(cart.subtotal, cart.currency)}
        </span>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold">Cart</h1>
      <Suspense fallback={<div className="py-12 text-gray-500">Loading...</div>}>
        <CartContents />
      </Suspense>
    </div>
  );
}
