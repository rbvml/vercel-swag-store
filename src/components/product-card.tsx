import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/types";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <h3 className="mt-3 text-sm font-normal">{product.name}</h3>
      <p className="text-sm text-gray-500">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: product.currency,
        }).format(product.price / 100)}
      </p>
    </Link>
  );
}
