import type { Review } from "@/types/product";

interface ProductReviewsProps {
  reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <article key={review.id} className="rounded border p-4 bg-white">
              <h3 className="font-semibold">{review.username}</h3>
              <p>★ {review.rating}/5</p>
              <p>{review.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
