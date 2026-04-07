export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  tags: string[];
  featured: boolean;
  createdAt: string;
};

export type Stock = {
  stock: number;
  inStock: boolean;
  lowStock: boolean;
};

export type Category = {
  slug: string;
  name: string;
  productCount: number;
};
