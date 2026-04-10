import { Suspense } from "react";
import Year from "./year";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-600">
      © <Suspense><Year /></Suspense> Vercel Swag Store. All rights reserved.
    </footer>
  );
}
