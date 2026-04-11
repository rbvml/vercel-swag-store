"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import {
  updateCartItemAction,
  removeCartItemAction,
} from "@/lib/cart-actions";

export default function CartItemControls({
  productId,
  initialQuantity,
}: {
  productId: string;
  initialQuantity: number;
}) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [prevInitialQuantity, setPrevInitialQuantity] = useState(initialQuantity);
  const [isPending, startTransition] = useTransition();
  const [isRemoving, setIsRemoving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (initialQuantity !== prevInitialQuantity) {
    setQuantity(initialQuantity);
    setPrevInitialQuantity(initialQuantity);
  }

  useEffect(() => {
    if (quantity === initialQuantity) return;

    timerRef.current = setTimeout(() => {
      startTransition(async () => {
        await updateCartItemAction(productId, quantity);
      });
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [quantity, initialQuantity, productId]);

  function handleRemove() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRemoving(true);
    startTransition(async () => {
      await removeCartItemAction(productId);
    });
  }

  const buttonClass =
    "rounded-md bg-gray-200 px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-300 active:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        disabled={quantity <= 1 || isPending || isRemoving}
        className={buttonClass}
      >
        −
      </button>
      <span className="w-8 text-center text-sm">{quantity}</span>
      <button
        type="button"
        onClick={() => setQuantity((q) => q + 1)}
        disabled={isPending || isRemoving}
        className={buttonClass}
      >
        +
      </button>
      <button
        type="button"
        onClick={handleRemove}
        disabled={isPending || isRemoving}
        className="ml-4 text-sm text-gray-500 transition-colors hover:text-black focus-visible:outline-none focus-visible:underline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRemoving ? "Removing..." : "Remove"}
      </button>
    </div>
  );
}
