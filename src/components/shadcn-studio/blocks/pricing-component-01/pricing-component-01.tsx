"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type PricingPlan = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  priceNote?: string;
  buttonText: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

const PricingCards = ({ pricingData }: { pricingData: PricingPlan[] }) => {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 space-y-2">
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Select the Best Plan for You!
          </h2>
          <p className="text-muted-foreground text-xl">
            Discover Our Flexible Plans, Compare Features, and Choose <br />
            the Ideal Option for Your Needs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingData.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all
                ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground border-primary shadow-2xl"
                    : "bg-card text-card-foreground"
                }`}
            >
              {plan.badge && (
                <Badge
                  className="absolute right-6 top-6"
                  variant={plan.highlighted ? "secondary" : "outline"}
                >
                  {plan.badge}
                </Badge>
              )}

              <CardContent className="p-8 space-y-6">
                {/* Header */}
                <div>
                  <h3 className="text-2xl font-semibold">{plan.title}</h3>
                  <p
                    className={`text-sm mt-2 ${
                      plan.highlighted
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                </div>

                {/* Pricing */}
                <div className="space-y-1">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold">
                     ₹{plan.price}
                    </span>

                    {plan.originalPrice && (
                      <span
                        className={`text-lg line-through opacity-60 ${
                          plan.highlighted
                            ? "text-primary-foreground/60"
                            : "text-muted-foreground"
                        }`}
                      >
                        ₹{plan.originalPrice}
                      </span>
                    )}
                  </div>

                  {plan.priceNote && (
                    <p
                      className={`text-sm ${
                        plan.highlighted
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {plan.priceNote}
                    </p>
                  )}
                </div>

                {/* Button */}
                <Button
                  className="w-full rounded-md"
                  variant={plan.highlighted ? "secondary" : "default"}
                >
                  {plan.buttonText}
                </Button>

                {/* Features */}
                <div className="space-y-4 pt-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check
                        className={`w-4 h-4 mt-1 shrink-0 ${
                          plan.highlighted
                            ? "text-primary-foreground"
                            : "text-primary"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.highlighted
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;