import { Product } from "@/types";
import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

export async function getProductDetails(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`product-${slug}`);
  try {
    const { data } = await api<Product>(`/products/${slug}`);
    return data;
  } catch (e) {
    if (e instanceof Error && e.message.includes("404")) notFound();
    throw e;
  }
}
