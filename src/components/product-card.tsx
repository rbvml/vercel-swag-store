import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-3 text-sm font-normal">{product.name}</h3>
      <p className="text-sm text-gray-500">
        ${(product.price / 100).toFixed(2)}
      </p>
    </Link>
  );
}
