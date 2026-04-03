import { api } from "@/lib/api";

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
  return api<Promotion>("/promotions");
}

export function PromoBannerSkeleton() {
  return (
    <div className="bg-black py-3 text-center text-sm text-white">&nbsp;</div>
  );
}

export default async function PromoBanner() {
  const { title, description, code } = await getPromotions();

  return (
    <section className="bg-black py-3 text-center text-sm text-white">
      {title} — {description} Code: <span className="font-bold">{code}</span>
    </section>
  );
}
