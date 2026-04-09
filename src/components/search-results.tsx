import { api } from "@/lib/api";
import { type Product } from "@/types";
import ProductCard from "./product-card";
import { cacheLife, cacheTag } from "next/cache";

const MAX_SEARCH_RESULTS = 5;

async function searchProducts(q?: string, category?: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const params = new URLSearchParams({ limit: `${MAX_SEARCH_RESULTS}` });
  if (q) params.set("search", q);
  if (category) params.set("category", category);

  const { data } = await api<Product[]>(`/products?${params.toString()}`);
  return data;
}

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const products = await searchProducts(q, category);

  if (products.length === 0) {
    return (
      <div className="mt-8 text-gray-500">
        No products found{q ? ` for "${q}"` : ""}.
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {Array.from({ length: MAX_SEARCH_RESULTS }).map((_, i) => (
        <div key={i}>
          <div className="aspect-square bg-gray-100" />
          <div className="mt-3 h-4 w-3/4 bg-gray-100" />
          <div className="mt-1 h-4 w-1/4 bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
