import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cacheLife, cacheTag } from "next/cache";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { api } from "@/lib/api";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

type StoreConfig = {
  storeName: string;
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
  };
};

async function getStoreConfig() {
  "use cache";
  cacheLife("days");
  cacheTag("store-config");
  return api<StoreConfig>("/store/config");
}

export async function generateMetadata(): Promise<Metadata> {
  const { seo, storeName } = await getStoreConfig();
  const { defaultTitle, titleTemplate, defaultDescription } = seo;

  return {
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description: defaultDescription,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      siteName: storeName,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        <Header />
        <main className="flex-1">{children}</main>
        <Suspense>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
