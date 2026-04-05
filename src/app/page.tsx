import Hero from "@/components/hero";
import PromoBanner, { PromoBannerSkeleton } from "@/components/promo-banner";
import FeaturedProducts from "@/components/featured-products";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<PromoBannerSkeleton />}>
        <PromoBanner />
      </Suspense>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Suspense fallback={null}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </>
  );
}
