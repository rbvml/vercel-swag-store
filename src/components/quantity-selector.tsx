"use client";

import { useState } from "react";

export default function QuantitySelector({
  max,
  disabled,
}: {
  max: number;
  disabled: boolean;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        disabled={disabled || quantity <= 1}
        className="bg-gray-200 px-3 py-1 text-sm font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        −{" "}
      </button>
      <span className="w-8 text-center text-sm">{quantity}</span>{" "}
      <button
        onClick={() => setQuantity((q) => Math.min(max, q + 1))}
        disabled={disabled || quantity >= max}
        className="bg-gray-200 px-3 py-1 text-sm font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +{" "}
      </button>
    </div>
  );
}
