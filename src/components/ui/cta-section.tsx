import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  backgroundImage: string;

  overlayOpacity?: number;
  align?: "center" | "left";
  height?: string;
  children?: ReactNode;
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
  backgroundImage,
  overlayOpacity = 0.5,
  align = "center",
  height = "py-16",
  children,
}: CTASectionProps) {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <section className="relative rounded-2xl overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="CTA Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div
        className={`relative z-10 ${height} px-6 flex flex-col justify-center ${alignment} text-white`}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>

        {description && (
          <p className="mb-8 max-w-2xl opacity-90 text-base">{description}</p>
        )}

        <Link
          href={buttonHref}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {buttonText}
        </Link>

        {children}
      </div>
    </section>
  );
}