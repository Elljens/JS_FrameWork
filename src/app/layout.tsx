import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Online Shop",
  description: "Shop our collection of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
