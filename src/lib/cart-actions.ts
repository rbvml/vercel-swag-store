"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import { getCartToken } from "@/lib/cart";

const CART_COOKIE = "cart_token";

function parseProductId(value: FormDataEntryValue | string | null): string {
  if (typeof value !== "string") {
    throw new Error("Product id must be a string");
  }

  const productId = value.trim();
  if (!productId) {
    throw new Error("Product id is required");
  }

  return productId;
}

function parseQuantity(value: FormDataEntryValue | number | null): number {
  const quantity =
    typeof value === "number" ? value : Number.parseInt(String(value ?? 1), 10);

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantity must be a positive integer");
  }

  return quantity;
}

async function ensureCartToken(): Promise<string> {
  const existing = await getCartToken();
  if (existing) return existing;

  const { response } = await api("/cart/create", { method: "POST" });
  const token = response.headers.get("x-cart-token");
  if (!token) throw new Error("No x-cart-token in cart create response");

  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
  });
  return token;
}

export async function addToCartAction(formData: FormData) {
  const productId = parseProductId(formData.get("productId"));
  const quantity = parseQuantity(formData.get("quantity"));

  const token = await ensureCartToken();
  await api("/cart", {
    method: "POST",
    headers: { "x-cart-token": token },
    body: { productId, quantity },
  });

  revalidatePath("/", "layout");
}

export async function updateCartItemAction(
  productId: string,
  quantity: number
) {
  const validProductId = parseProductId(productId);
  const validQuantity = parseQuantity(quantity);
  const token = await getCartToken();
  if (!token) return;

  await api(`/cart/${validProductId}`, {
    method: "PATCH",
    headers: { "x-cart-token": token },
    body: { quantity: validQuantity },
  });

  revalidatePath("/", "layout");
}

export async function removeCartItemAction(productId: string) {
  const validProductId = parseProductId(productId);
  const token = await getCartToken();
  if (!token) return;

  await api(`/cart/${validProductId}`, {
    method: "DELETE",
    headers: { "x-cart-token": token },
  });

  revalidatePath("/", "layout");
}
