import Container from "@/components/shared/Container";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/ui/cta-section";

const blogPosts = [
  {
    id: 1,
    title: "5 Things to Check Before Booking a Turf",
    description:
      "Avoid last-minute surprises. Learn what to verify before confirming your turf booking.",
    category: "Booking Tips",
    date: "Feb 20, 2026",
    image: "/blogs/3.png",
  },
  {
    id: 2,
    title: "Why Evening Slots Get Sold Out So Fast",
    description:
      "Peak hours, demand patterns, and how you can grab your preferred time slot early.",
    category: "Insights",
    date: "Feb 18, 2026",
    image: "/blogs/1.png",
  },
  {
    id: 3,
    title: "How Group Booking Saves You Money",
    description:
      "Understand pricing benefits and cost-splitting strategies for group games.",
    category: "Group Booking",
    date: "Feb 15, 2026",
    image: "/blogs/2.png",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Container>
        {/* Hero */}
        <div className="pb-12 text-start">
          <h1 className="text-4xl font-semibold text-foreground mb-2">
            Turf Booking Insights & Guides
          </h1>
          <p className="text-muted-foreground text-xl max-w-xl">
            Stay updated with booking tips, turf management insights, and
            strategies to maximize your game experience.
          </p>
        </div>

        {/* Featured */}
        <div className="mb-10 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-88">
              <Image
                src="/blogs/1.png"
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
        </div>

        {/* Blog Grid */}
        <div className="pb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Latest Articles
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative h-66">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <span className="text-md font-medium text-primary">
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
        </div>
        <CTASection
          title="Ready to Book Your Next Game?"
          description="Discover top-rated turfs in your area and lock your slot in seconds."
          buttonText="Explore Turfs"
          buttonHref="/turfs"
          backgroundImage="/background/bg1.svg"
        />
      </Container>
    </div>
  );
}
