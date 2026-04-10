import { cookies } from "next/headers";
import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";
import type { Cart } from "@/types";

const CART_COOKIE = "cart_token";

export async function getCartToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE)?.value ?? null;
}

export async function getCart(): Promise<Cart | null> {
  "use cache: private";
  cacheLife({ stale: 60 });
  cacheTag("cart");

  const token = await getCartToken();
  if (!token) return null;

  try {
    const { data } = await api<Cart>("/cart", {
      headers: { "x-cart-token": token },
    });
    return data;
  } catch (e) {
    if (e instanceof Error && e.message.includes("404")) return null;
    throw e;
  }
}
