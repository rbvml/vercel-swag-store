"use client";

import { useState } from "react";
import QuantitySelector from "./quantity-selector";
import { addToCartAction } from "@/lib/cart-actions";

export default function AddToCartForm({
  productId,
  maxQuantity,
  inStock,
}: {
  productId: string;
  maxQuantity: number;
  inStock: boolean;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <form action={addToCartAction}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={quantity} />
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        max={maxQuantity}
        disabled={!inStock}
      />
      <button
        type="submit"
        disabled={!inStock}
        className="mt-8 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 active:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </form>
  );
}
