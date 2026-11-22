import "server-only";

import type {
  AllProductsResponse,
  SingleProductResponse,
  Product,
} from "@/types/product";

const BASE_URL = "https://v2.api.noroff.dev/online-shop";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: AllProductsResponse = await response.json();

  return result.data;
}

export async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result: SingleProductResponse = await response.json();

  return result.data;
}
