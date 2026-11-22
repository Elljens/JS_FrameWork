"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setShowMessage(true);
  }

  useEffect(() => {
    if (!showMessage) return;

    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showMessage]);

  return (
    <div>
      <button
        type="button"
        onClick={handleAddToCart}
        className="rounded bg-black text-white px-6 py-3 shadow-md"
      >
        Add to Cart
      </button>

      {showMessage && (
        <div
          role="status"
          className="mt-4 rounded-lg border border-green-300 bg-green-100 p-4 text-green-800"
        >
          ✓ {product.title} has been added to your cart!
        </div>
      )}
    </div>
  );
}
