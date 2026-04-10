import Image from "next/image";
import {
  removeCartItemAction,
  updateCartItemAction,
} from "@/lib/cart-actions";
import SubmitButton from "./submit-button";
import type { CartItem as CartItemType } from "@/types";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default function CartItem({ item }: { item: CartItemType }) {
  const { product, quantity, lineTotal, productId } = item;

  const decrement = updateCartItemAction.bind(null, productId, quantity - 1);
  const increment = updateCartItemAction.bind(null, productId, quantity + 1);
  const remove = removeCartItemAction.bind(null, productId);

  return (
    <div className="flex gap-4 border-b border-gray-200 py-6">
      <div className="relative h-24 w-24 flex-shrink-0 bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain"
          sizes="96px"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <form action={decrement}>
            <SubmitButton
              disabled={quantity <= 1}
              className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-300 active:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              −
            </SubmitButton>
          </form>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <form action={increment}>
            <SubmitButton className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-300 active:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
              +
            </SubmitButton>
          </form>
          <form action={remove} className="ml-4">
            <SubmitButton
              pendingLabel="Removing..."
              className="text-sm text-gray-500 transition-colors hover:text-black focus-visible:outline-none focus-visible:underline"
            >
              Remove
            </SubmitButton>
          </form>
        </div>
      </div>

      <div className="text-sm font-medium">
        {formatPrice(lineTotal, product.currency)}
      </div>
    </div>
  );
}
