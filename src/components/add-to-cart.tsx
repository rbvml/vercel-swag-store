import { api } from "@/lib/api";
import StockIndicator from "./stock-indicator";
import type { Stock } from "@/types";
import QuantitySelector from "./quantity-selector";

export default async function AddToCart({ slug }: { slug: string }) {
  const { stock, inStock, lowStock } = await api<Stock>(
    `/products/${slug}/stock`
  );

  return (
    <>
      <StockIndicator inStock={inStock} lowStock={lowStock} stock={stock} />
      <QuantitySelector max={stock} disabled={!inStock} />
      <button
        disabled={!inStock}
        className="mt-8 bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-300
  disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </>
  );
}

export function AddToCartSkeleton() {
  return (
    <>
      <p className="mt-2 text-sm text-gray-300">Checking stock…</p>
      <div className="mt-4 h-8" />
      <div className="mt-8 h-11 w-32 bg-gray-200" />
    </>
  );
}
