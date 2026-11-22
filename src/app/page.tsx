import { getProducts } from "@/lib/api";
import ProductBrowser from "@/components/products/ProductBrowser";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Online Shop</h1>

      <ProductBrowser products={products} />
    </main>
  );
}
