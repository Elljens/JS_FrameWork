import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import ProductPrice from "./ProductPrice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.discountedPrice < product.price
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  return (
    <div className="overflow-hidden rounded-lg border shadow-sm transition hover:shadow-lg bg-white">
      <div className="relative h-64">
        <Image
          src={product.image.url}
          alt={product.image.alt || product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="eager"
        />

        {discount > 0 && (
          <span className="absolute left-0 top-5 rounded-r bg-red-700 px-3 py-2 text-sm text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="mb-2 font-semibold">{product.title}</h2>

        <p className="mb-2 text-gray-700"> ★ {product.rating}/5</p>

        <ProductPrice
          price={product.price}
          discountedPrice={product.discountedPrice}
        />
      </div>
      <Link
        href={`/product/${product.id}`}
        className="bg-black text-white flex text-center font-bold justify-center py-3 px-8 shadow-md"
      >
        View Details
      </Link>
    </div>
  );
}
