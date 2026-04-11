"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useTransition } from "react";
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
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (initialQuery !== prevInitialQuery) {
    setQuery(initialQuery);
    setPrevInitialQuery(initialQuery);
  }
  if (initialCategory !== prevInitialCategory) {
    setCategory(initialCategory);
    setPrevInitialCategory(initialCategory);
  }

  useEffect(() => {
    if (query === initialQuery && category === initialCategory) return;
    if (query.length > 0 && query.length < 3) return;

    timerRef.current = setTimeout(() => {
      startTransition(() => {
        router.replace(buildUrl(query, category));
      });
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, category, initialQuery, initialCategory, router]);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPending) return;
    if (query === initialQuery && category === initialCategory) return;
    if (timerRef.current) clearTimeout(timerRef.current);
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

export function SearchFormSkeleton() {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-2">
      <div className="flex-1 h-[42px] rounded-md bg-gray-100" />
      <div className="h-[42px] w-40 rounded-md bg-gray-100" />
      <div className="h-[42px] min-w-32 rounded-md bg-gray-100" />
    </div>
  );
}
