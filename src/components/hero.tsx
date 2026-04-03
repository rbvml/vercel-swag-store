import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 py-16 sm:py-24">
      <div className="flex-1">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Wear the framework
          <br />
          you ship with.
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-lg">
          Premium swag for developers who build with Vercel. From tees to tech
          gear, represent the tools you love.
        </p>
        <Link
          href="/search"
          className="mt-8 inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Browse All Products →
        </Link>
      </div>
      <div className="flex-1">
        <Image
          src="/hero.png"
          alt="Minimal Black Backpack"
          width={500}
          height={500}
          priority
        />
      </div>
    </section>
  );
}
