"use client";

import { useCart } from "@/context/CartContext";

export default function CartCount() {
  const { cartCount } = useCart();

  return (
    <span className="absolute top-3 right-10 rounded-full bg-red-700 px-2 py-1 text-xs text-white">
      {cartCount}
    </span>
  );
}
