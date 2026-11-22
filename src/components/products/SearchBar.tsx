"use client";

import Link from "next/link";
import type { Product } from "@/types/product";

interface SearchBarProps {
  products: Product[];
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  products,
  search,
  setSearch,
}: SearchBarProps) {
  const suggestions = search.trim()
    ? products
        .filter((product) =>
          product.title.toLowerCase().includes(search.trim().toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <div className="relative flex-1">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded border p-3 bg-white"
      />

      {suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white shadow-lg">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="block p-3 hover:bg-gray-100"
            >
              {product.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
