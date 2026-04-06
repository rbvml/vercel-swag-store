import { Product } from "@/types";
import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";

export async function getProductDetails(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`product-${slug}`);
  return api<Product>(`/products/${slug}`);
}
