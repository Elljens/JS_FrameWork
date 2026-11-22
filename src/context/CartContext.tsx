"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/types/product";
import type { CartItem, CartContextType } from "@/types/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (
          Array.isArray(parsed) &&
          parsed.every(
            (item): item is CartItem =>
              typeof item === "object" &&
              item !== null &&
              "product" in item &&
              "quantity" in item &&
              typeof item.quantity === "number" &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0 &&
              typeof item.product === "object" &&
              item.product !== null &&
              typeof item.product.id === "string" &&
              typeof item.product.price === "number" &&
              typeof item.product.discountedPrice === "number"
          )
        ) {
          setCart(parsed);
        }
      }
    } catch {
      console.error("Could not restore cart");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  function addToCart(product: Product) {
    setCart((previous) => {
      const existing = previous.find((item) => item.product.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { product, quantity: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((previous) => previous.filter((item) => item.product.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce((total, item) => {
    const { price, discountedPrice } = item.product;
    const finalPrice = discountedPrice < price ? discountedPrice : price;

    return total + finalPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
