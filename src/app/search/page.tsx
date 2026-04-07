import { Suspense } from "react";
import SearchForm from "@/components/search-form";
import SearchResults, { SearchResultsSkeleton } from "@/components/search-results";
import { api } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import type { Category } from "@/types";

async function getCategories() {
  "use cache";
  cacheLife("days");
  cacheTag("categories");
  return api<Category[]>("/categories");
}

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const categories = await getCategories();
  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold">Search Products</h1>

      <div className="mt-8">
        <Suspense fallback={<div className="h-10" />}>
          {searchParams.then(({ q, category }) => (
            <SearchForm
              key={`${q ?? ""}-${category ?? ""}`}
              categories={sortedCategories}
              initialQuery={q ?? ""}
              initialCategory={category ?? ""}
            />
          ))}
        </Suspense>
      </div>

      <Suspense fallback={<SearchResultsSkeleton />}>
        {searchParams.then(({ q, category }) => (
          <SearchResults q={q} category={category} />
        ))}
      </Suspense>
    </div>
  );
}
