import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";
import ProductCard from "./product-card";
import { type Product } from "@/types";

async function getFeaturedProducts() {
  "use cache";
  cacheLife("days");
  cacheTag("products");
  const { data } = await api<Product[]>("/products?featured=true&limit=6");
  return data;
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="pt-4 pb-16">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
