import { Suspense } from "react";
import SearchForm, { SearchFormSkeleton } from "@/components/search-form";
import SearchResults, {
  SearchResultsSkeleton,
} from "@/components/search-results";
import { api } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import type { Category } from "@/types";

type SearchPageParams = {
  q?: string;
  category?: string;
};

async function getCategories() {
  "use cache";
  cacheLife("weeks");
  cacheTag("categories");
  const { data } = await api<Category[]>("/categories");
  return data;
}

export const metadata: Metadata = {
  title: "Search",
};

async function SearchFormContent({
  searchParams,
  categories,
}: {
  searchParams: Promise<SearchPageParams>;
  categories: Category[];
}) {
  const { q = "", category = "" } = await searchParams;

  return (
    <div className="mt-8">
      <SearchForm
        categories={categories}
        initialQuery={q}
        initialCategory={category}
      />
    </div>
  );
}

async function SearchResultsContent({
  searchParams,
}: {
  searchParams: Promise<SearchPageParams>;
}) {
  const { q = "", category = "" } = await searchParams;

  return <SearchResults q={q} category={category} />;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchPageParams>;
}) {
  const categories = await getCategories();
  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold">Search Products</h1>
      <Suspense fallback={<SearchFormSkeleton />}>
        <SearchFormContent
          searchParams={searchParams}
          categories={sortedCategories}
        />
      </Suspense>
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResultsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
