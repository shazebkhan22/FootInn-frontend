"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[25rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={features}
        direction="right"
        speed="fast"
      />
    </div>
  );
}

const features = [
  {
    title: "Add Your Turf",
    description:
      "List your turf in minutes, set pricing, manage availability and start receiving bookings instantly.",
    ctaText: "Add Turf Now",
    ctaLink: "/add-turf",
  },
  {
    title: "Get Detailed Analytics",
    description:
      "Track bookings, revenue insights, peak hours, and customer trends in real-time.",
    ctaText: "View Analytics",
    ctaLink: "/dashboard/analytics",
  },
  {
    title: "Manage Slots Easily",
    description:
      "Block dates, adjust timings, and prevent double bookings with smart validation.",
    ctaText: "Manage Availability",
    ctaLink: "/dashboard/slots",
  },
  {
    title: "Accept Online Payments",
    description:
      "Enable secure UPI, card, and wallet payments with automatic booking confirmation.",
    ctaText: "Enable Payments",
    ctaLink: "/settings/payments",
  },
  {
    title: "Customer Management",
    description:
      "Access booking history, repeat customers, and manage communication easily.",
    ctaText: "View Customers",
    ctaLink: "/dashboard/customers",
  },
];
