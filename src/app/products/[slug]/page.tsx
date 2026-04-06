import { Suspense } from "react";
import ProductDetails from "@/components/product-details";
import AddToCart from "@/components/add-to-cart";
import { AddToCartSkeleton } from "@/components/add-to-cart";
import type { Metadata } from "next";
import { getProductDetails } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { name, description, images } = await getProductDetails(slug);

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      images,
    },
  };
}

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div>Loading...</div>}>
        {params.then(({ slug }) => (
          <ProductDetails slug={slug}>
            <Suspense fallback={<AddToCartSkeleton />}>
              <AddToCart slug={slug} />
            </Suspense>
          </ProductDetails>
        ))}
      </Suspense>
    </div>
  );
}
