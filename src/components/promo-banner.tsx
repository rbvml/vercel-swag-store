import { api } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";

type Promotion = {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
};

async function getPromotions() {
  "use cache";
  cacheLife("minutes");
  cacheTag("promotions");
  const { data } = await api<Promotion>("/promotions");
  return data;
}

export default async function PromoBanner() {
  const { title, description, code } = await getPromotions();

  return (
    <section className="bg-black px-4 sm:px-6 lg:px-8 py-3 text-center text-sm text-white">
      {title} — {description} Code: <span className="font-bold">{code}</span>
    </section>
  );
}
