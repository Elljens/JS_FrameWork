import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import ProductPrice from "@/components/products/ProductPrice";
import ProductReviews from "@/components/products/ProductReview";
import AddToCartButton from "@/components/products/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const discount =
    product.discountedPrice < product.price
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-gray-700 py-5">
        <Link href="/">← Back to shop</Link>
      </p>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="h-96 relative shadow-md rounded-lg">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
          {discount > 0 && (
            <span className="rounded-r bg-red-700 px-3 py-2 text-sm text-white z-50 absolute top-10">
              -{discount}%
            </span>
          )}
        </div>

        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>

          <p className="mb-4">★ {product.rating}/5</p>

          <ProductPrice
            price={product.price}
            discountedPrice={product.discountedPrice}
          />

          <p className="my-6">{product.description}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded bg-gray-100 px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      <ProductReviews reviews={product.reviews} />
    </main>
  );
}
