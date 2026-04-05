import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";
import ProductCard from "./product-card";
import { type Product } from "@/types";
import Link from "next/link";

async function getFeaturedProducts() {
  "use cache";
  cacheLife("days");
  cacheTag("products");
  return api<Product[]>("/products?featured=true&limit=6");
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link href="/search" className="text-sm text-gray-600 hover:text-black">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
