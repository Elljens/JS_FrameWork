"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const router = useRouter();

  function handleCheckout() {
    if (cart.length === 0) return;

    router.push("/checkout/success");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link href="/" className="mt-4 inline-block underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => {
              const product = item.product;

              const price =
                product.discountedPrice < product.price
                  ? product.discountedPrice
                  : product.price;

              return (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 border-b pb-6 sm:flex-row"
                >
                  <div className="relative h-32 w-32 shrink-0">
                    <Image
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                      fill
                      className="rounded object-cover"
                      sizes="128px"
                    />
                  </div>

                  <div className="flex-1">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-lg font-semibold"
                    >
                      {product.title}
                    </Link>

                    <p className="my-2">{price.toFixed(2)} kr</p>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${product.title}`}
                        className="rounded border px-3 py-1 disabled:opacity-40"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${product.title}`}
                        className="rounded border px-3 py-1"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="mt-3 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="font-bold">
                    {(price * item.quantity).toFixed(2)} kr
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-end gap-4">
            <h2 className="text-2xl font-bold">
              Total: {cartTotal.toFixed(2)} kr
            </h2>

            <button
              type="button"
              onClick={handleCheckout}
              className="rounded bg-black px-8 py-3 text-white hover:bg-gray-800"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
