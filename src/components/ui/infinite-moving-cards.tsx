"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type FeatureItem = {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: FeatureItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    if (scrollerRef.current.dataset.cloned === "true") return;

    const children = Array.from(scrollerRef.current.children);

    children.forEach((child) => {
      const clone = child.cloneNode(true);
      scrollerRef.current?.appendChild(clone);
    });

    scrollerRef.current.dataset.cloned = "true";

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";

    containerRef.current.style.setProperty("--animation-duration", duration);

    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 max-w-7xl overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.title}-${idx}`}
            className="relative w-[320px] md:w-[350px] shrink-0 rounded-2xl border border-border bg-card px-8 py-8 shadow-sm transition-all hover:shadow-lg"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href={item.ctaLink}
                  className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  {item.ctaText}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};