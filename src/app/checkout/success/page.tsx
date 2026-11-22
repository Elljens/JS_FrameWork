"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true;
      clearCart();
    }
  }, [clearCart]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="mb-6 text-6xl text-green-600">✓</div>

      <h1 className="mb-4 text-3xl font-bold">Checkout Successful!</h1>

      <p className="mb-8 text-gray-600">
        Thank you for your purchase! Your checkout has been completed
        successfully.
      </p>

      <Link
        href="/"
        className="inline-block rounded bg-black px-8 py-3 text-white"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
