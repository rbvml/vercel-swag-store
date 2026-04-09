import { api } from "@/lib/api";
import StockIndicator from "./stock-indicator";
import AddToCartForm from "./add-to-cart-form";
import type { Stock } from "@/types";

export default async function AddToCart({
  slug,
  productId,
}: {
  slug: string;
  productId: string;
}) {
  const { data } = await api<Stock>(`/products/${slug}/stock`);
  const { stock, inStock, lowStock } = data;

  return (
    <>
      <StockIndicator inStock={inStock} lowStock={lowStock} stock={stock} />
      <AddToCartForm productId={productId} maxQuantity={stock} inStock={inStock} />
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
