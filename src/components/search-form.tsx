"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { type Category } from "@/types";

function buildUrl(q: string, cat: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (cat) params.set("category", cat);
  return `/search?${params.toString()}`;
}

export default function SearchForm({
  categories,
  initialQuery,
  initialCategory,
}: {
  categories: Category[];
  initialQuery: string;
  initialCategory: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    if (query === initialQuery && category === initialCategory) return;
    if (query.length > 0 && query.length < 3) return;

    const timer = setTimeout(() => {
      startTransition(() => {
        router.replace(buildUrl(query, category));
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, category, initialQuery, initialCategory, router]);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      router.replace(buildUrl(query, category));
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isPending}
        className="min-w-32 rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 active:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:bg-gray-400"
      >
        {isPending ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
