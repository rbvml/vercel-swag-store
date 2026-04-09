import Hero from "@/components/hero";
import PromoBanner from "@/components/promo-banner";
import FeaturedProducts from "@/components/featured-products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Vercel Swag Store",
  },
  description:
    "Official Vercel merchandise. Premium developer apparel, accessories, and gear.",
};

export default function Home() {
  return (
    <>
      <PromoBanner />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <FeaturedProducts />
      </div>
    </>
  );
}
