"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";

interface ProductBrowserProps {
  products: Product[];
}

export default function ProductBrowser({ products }: ProductBrowserProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "price-low") {
      result.sort((a, b) => a.discountedPrice - b.discountedPrice);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, sort]);

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <SearchBar products={products} search={search} setSearch={setSearch} />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
          className="rounded border p-3 bg-white"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  );
}
