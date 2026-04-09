import Image from "next/image";
import type { Product } from "@/types";

export default function ProductDetails({
  product,
  children,
}: {
  product: Product;
  children?: React.ReactNode;
}) {
  const { images, name, description, price, currency } = product;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price / 100);

  return (
    <div className="md:mx-auto md:max-w-7xl md:px-6 lg:px-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="px-4 sm:px-6 md:px-0 pb-12 md:pb-0">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="mt-4 text-gray-600">{description}</p>
          <p className="mt-4 text-2xl font-bold">{formattedPrice}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
