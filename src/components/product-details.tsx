import Image from "next/image";
import { getProductDetails } from "@/lib/products";

export default async function ProductDetails({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  const { images, name, description, price } = await getProductDetails(slug);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);

  return (
    <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
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
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="mt-4 text-gray-600">{description}</p>
        <p className="mt-4 text-2xl font-bold">{formattedPrice}</p>
        {children}
      </div>
    </div>
  );
}
