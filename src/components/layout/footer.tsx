"use client";

import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className=" pt-20 px-5">
      <footer className="bg-card w-full max-w-full mx-auto text-card-foreground pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-t-3xl overflow-hidden border border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
          {/* Left Section */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="block">
              <span className="text-2xl font-bold text-foreground">
                FootInn
              </span>
            </Link>

            <p className="text-sm leading-6 text-muted-foreground max-w-96">
              Footinn helps you book smarter by transforming your game plans
              into seamless, real-time turf reservations.
            </p>

            <div className="flex gap-5 md:gap-6">
              {["X", "Github", "LinkedIn", "YouTube", "Instagram"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Right Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
            <FooterColumn
              title="Products"
              links={["Components", "Templates", "Icons"]}
            />

            <FooterColumn
              title="Resources"
              links={[
                "PrebuiltUI",
                "Templates",
                "Components",
                "Blogs",
                "Store",
              ]}
            />

            <FooterColumn
              title="Company"
              links={[
                "About",
                "Vision",
                "Careers",
                "Privacy Policy",
                "Contact Us",
              ]}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 FootInn</p>
          <p>All rights reserved.</p>
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-accent rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <h1 className="text-center font-extrabold leading-[0.7] text-teal-600 text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_var(--border)] mt-6">
            FootInn
          </h1>
        </div>
      </footer>
    </div>
  );
};

type FooterColumnProps = {
  title: string;
  links: string[];
};

const FooterColumn: FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="font-medium text-sm mb-4 text-foreground">{title}</h3>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
