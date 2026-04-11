import Image from "next/image";
import CartItemControls from "./cart-item-controls";
import type { CartItem as CartItemType } from "@/types";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default function CartItem({ item }: { item: CartItemType }) {
  const { product, quantity, lineTotal, productId } = item;

  return (
    <div className="flex gap-4 border-b border-gray-200 py-6">
      <div className="relative h-24 w-24 flex-shrink-0 bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain"
          sizes="96px"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>

        <CartItemControls productId={productId} initialQuantity={quantity} />
      </div>

      <div className="text-sm font-medium">
        {formatPrice(lineTotal, product.currency)}
      </div>
    </div>
  );
}
