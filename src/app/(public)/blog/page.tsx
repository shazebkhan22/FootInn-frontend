import Container from "@/components/shared/Container";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "5 Things to Check Before Booking a Turf",
    description:
      "Avoid last-minute surprises. Learn what to verify before confirming your turf booking.",
    category: "Booking Tips",
    date: "Feb 20, 2026",
    image: "/images/blog-1.jpg",
  },
  {
    id: 2,
    title: "Why Evening Slots Get Sold Out So Fast",
    description:
      "Peak hours, demand patterns, and how you can grab your preferred time slot early.",
    category: "Insights",
    date: "Feb 18, 2026",
    image: "/images/blog-2.jpg",
  },
  {
    id: 3,
    title: "How Group Booking Saves You Money",
    description:
      "Understand pricing benefits and cost-splitting strategies for group games.",
    category: "Group Booking",
    date: "Feb 15, 2026",
    image: "/images/blog-3.jpg",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Container>
        {/* Hero */}
        <section className="pb-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Turf Booking Insights & Guides
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with booking tips, turf management insights,
            and strategies to maximize your game experience.
          </p>
        </section>

        {/* Featured */}
        <section className="mb-16 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <Image
                src="/images/featured-blog.jpg"
                alt="Featured Blog"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8 flex flex-col justify-center">
              <span className="text-sm text-primary font-semibold mb-2">
                Featured
              </span>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                How to Choose the Perfect Turf for Your Weekend Match
              </h2>

              <p className="text-muted-foreground mb-6">
                From location and amenities to pricing and slot availability —
                here’s a complete guide to selecting the best turf.
              </p>

              <Link
                href="#"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                Read More
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-20">
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            Latest Articles
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs font-medium text-primary">
                    {post.category}
                  </span>

                  <h4 className="text-lg font-semibold mt-2 mb-3 text-foreground">
                    {post.title}
                  </h4>

                  <p className="text-muted-foreground text-sm mb-4">
                    {post.description}
                  </p>

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{post.date}</span>

                    <Link
                      href="#"
                      className="text-primary font-medium hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-2xl py-12 text-center mb-20">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Book Your Next Game?
          </h3>

          <p className="mb-6 opacity-90">
            Discover top-rated turfs in your area and lock your slot in seconds.
          </p>

          <Link
            href="/turfs"
            className="bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Explore Turfs
          </Link>
        </section>
      </Container>
    </div>
  );
}