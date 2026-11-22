import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="mb-6 text-6xl text-green-600">✓</div>

      <h1 className="mb-4 text-3xl font-bold">Message sent!</h1>

      <p className="mb-8 text-gray-600">We have received your message.</p>

      <Link
        href="/"
        className="inline-block rounded bg-black px-8 py-3 text-white"
      >
        Back to Home Page
      </Link>
    </main>
  );
}
