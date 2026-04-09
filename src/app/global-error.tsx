"use client";

import "./globals.css";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white text-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="mt-4 text-gray-600">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="mt-8 bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
