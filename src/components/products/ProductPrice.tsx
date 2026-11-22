interface ProductPriceProps {
  price: number;
  discountedPrice: number;
}

export default function ProductPrice({
  price,
  discountedPrice,
}: ProductPriceProps) {
  const hasDiscount = discountedPrice < price;

  const discount = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        {hasDiscount && (
          <span className="text-gray-500 line-through">
            {price.toFixed(2)} kr
          </span>
        )}

        <span className="font-bold">
          {(hasDiscount ? discountedPrice : price).toFixed(2)} kr
        </span>
      </div>
    </div>
  );
}
