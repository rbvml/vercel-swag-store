import { Suspense } from "react";
import ProductDetails, { ProductDetailSkeleton } from "@/components/product-details";
import AddToCart, { AddToCartSkeleton } from "@/components/add-to-cart";
import type { Metadata } from "next";
import { getProductDetails } from "@/lib/products";
import { api } from "@/lib/api";
import type { Product } from "@/types";

export async function generateStaticParams() {
  const { data } = await api<Product[]>("/products?limit=100");
  return data.map((product) => ({ slug: product.slug }));
}

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDetails(slug);

  return (
    <ProductDetails product={product}>
      <Suspense fallback={<AddToCartSkeleton />}>
        <AddToCart slug={slug} productId={product.id} />
      </Suspense>
    </ProductDetails>
  );
}

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
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
