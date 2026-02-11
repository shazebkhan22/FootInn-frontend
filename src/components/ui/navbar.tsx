"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DropdownContentItem {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

interface FeatureCardData {
  title: string;
  description: string;
  link: string;
  linear: string;
  icon: string;
}

interface NavItem {
  name: string;
  link: string;
  dropdownContent: DropdownContentItem[] | null;
  featureCard: FeatureCardData | null;
}

const Logo: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <Link href="/" className="flex items-center">
    <Image
      src="/logo.svg"
      alt="Logo"
      width={40}
      height={40}
      className={`h-10 w-auto transition-transform duration-500 ${
        isScrolled ? "rotate-360 scale-110" : "rotate-0"
      }`}
    />
  </Link>
);

const DesktopfeatureCard: React.FC<{ card: FeatureCardData }> = ({ card }) => (
  <a
    href={card.link}
    className="block p-4 bg-linear-to-br from-neutral-50 to-neutral-50 hover:from-teal-100 hover:to-teal-200 rounded-lg hover:shadow-md transition-all group h-full"
  >
    <div className="mb-3">
      <div
        className={`w-full h-32 ${
          card.linear || "bg-linear-to-r from-emerald-400 to-emerald-500"
        } rounded-md flex items-center justify-center text-4xl text-white transition-all duration-300`}
      >
        {card.icon || "⭐"}
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <div className="font-medium text-base group-hover:text-emerald-800 leading-tight">
        {card.title}
      </div>
      <div className="text-sm text-neutral-600 group-hover:text-emerald-700 transition">
        {card.description || "Learn more →"}
      </div>
    </div>
  </a>
);

const DesktopDropdownItem: React.FC<{
  item: DropdownContentItem;
  onMouseEnter: (item: DropdownContentItem) => void;
  onMouseLeave: () => void;
}> = ({ item, onMouseEnter, onMouseLeave }) => (
  <a
    href={item.link}
    className="flex gap-4 items-center p-4 rounded-lg hover:bg-teal-200 transition-all group"
    onMouseEnter={() => onMouseEnter(item)} // Fire handler on hover
    onMouseLeave={onMouseLeave}           // Fire handler on leave
  >
    <div
      className={`w-11 h-11 ${item.color} group-hover:bg-neutral-100 rounded-lg shrink-0 flex items-center justify-center text-2xl`}
    >
      {item.icon}
    </div>
    <div className="flex-1">
      <p className="text-base font-medium transition-colors group-hover:text-emerald-800">
        {item.title}
      </p>
      <p className="text-sm text-neutral-600 transition-colors group-hover:text-emerald-700">
        {item.description}
      </p>
    </div>
  </a>
);

// 2. REVISED GENERIC DESKTOP DROPDOWN (Manages hover state and dynamic card content)
const GenericDesktopDropdown: React.FC<{ navItem: NavItem }> = ({ navItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, sethoveredItem] = useState<DropdownContentItem | null>(null);

  const hasDropdownContent = navItem.dropdownContent && navItem.dropdownContent.length > 0;
  // Determine if we should reserve space for a two-column layout
  const hasFeatureCardSlot = navItem.featureCard !== null || hasDropdownContent;

  if (!hasDropdownContent && !navItem.link) return null;

  // Render a simple link if no dropdown content exists
  if (!hasDropdownContent || !navItem.dropdownContent) {
    return (
      <a
        href={navItem.link}
        className="px-3 py-1.5 rounded-full hover:bg-black/5 transition-all text-neutral-700 font-medium"
      >
        {navItem.name}
      </a>
    );
  }

  // Memoized value for the card to display
  const cardToDisplay: FeatureCardData | null = useMemo(() => {
    // 1. If an item is hovered, construct a FeatureCardData from it.
    if (hoveredItem) {
      return {
        title: hoveredItem.title,
        description: hoveredItem.description,
        link: hoveredItem.link,
        linear: "bg-linear-to-r from-teal-200 to-emerald-400",
        icon: hoveredItem.icon,
      };
    }
    // 2. Otherwise, use the original static featureCard if it exists.
    return navItem.featureCard;
  }, [hoveredItem, navItem.featureCard]);

  // Handlers
  const handleItemHover = (item: DropdownContentItem) => sethoveredItem(item);
  const handleItemLeave = () => sethoveredItem(null);

  // Width class updated to check for the slot
  const dropdownWidthClass = hasFeatureCardSlot
    ? "left-[-140px] w-[650px]"
    : "left-0 w-[300px]";

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        sethoveredItem(null); // Clear hover state when leaving the entire menu
      }}
    >
      <button className="px-3 py-1.5 rounded-full hover:bg-black/5 transition-all text-neutral-700 font-medium flex items-center gap-1 hover:cursor-pointer">
        {navItem.name}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute top-full ${dropdownWidthClass} pt-6 z-50 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg border-black/10 p-4">
          {/* Use cardToDisplay to determine if the two-column layout is needed */}
          <div className={`flex ${cardToDisplay ? "gap-4" : "gap-0"}`}>
            <div className="flex-1 space-y-2">
              {navItem.dropdownContent.map((item, idx) => (
                <DesktopDropdownItem
                  key={idx}
                  item={item}
                  onMouseEnter={handleItemHover}
                  onMouseLeave={handleItemLeave}
                />
              ))}
            </div>

            {/* Render the dynamic/default card if it exists */}
            {cardToDisplay && (
              <div className="flex-1">
                <DesktopfeatureCard card={cardToDisplay} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const DesktopNavigation: React.FC<{ navItems: NavItem[] }> = ({ navItems }) => (
  <div className="hidden md:flex items-center gap-1">
    {navItems.map((item, idx) => (
      <GenericDesktopDropdown key={idx} navItem={item} />
    ))}
  </div>
);

const ContactButton: React.FC<{ mobile: boolean; onClick?: () => void; isScrolled: boolean }> = ({ mobile, onClick, isScrolled }) => {
  if (mobile) {
    return (
      <a
        href="/contact"
        className="mx-4 mt-4 px-4 py-3 text-center font-mono rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-all"
        onClick={onClick}
      >
        Contact
      </a>
    );
  }

  const desktopClasses = `hidden md:flex items-center px-4 py-1.5 rounded-full transition-all font-medium font-mono ml-2 
        ${
          isScrolled
            ? "bg-emerald-500 text-white border-emerald-400 hover:bg-emerald-700"
            : "border border-black/10 hover:bg-black/5"
        }`;

  return (
    <a
      href="/contact"
      className={desktopClasses}
      onClick={onClick}
    >
      Contact
    </a>
  );
};


const MobileDropdown: React.FC<{
  title: string;
  content: DropdownContentItem[];
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ title, content, setMobileMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const MobileDropdownItem: React.FC<{ item: DropdownContentItem }> = ({ item }) => (
    <a
      href={item.link}
      className="flex gap-3 items-center p-3 rounded-lg hover:bg-emerald-200 transition-colors group"
      onClick={() => setMobileMenuOpen(false)}
    >
      <div
        className={`w-10 h-10 ${item.color} rounded-lg shrink-0 flex items-center justify-center text-xl group-hover:bg-neutral-100`}
      >
        {item.icon}
      </div>
      <div>
        <p className="font-medium text-sm group-hover:text-emerald-800">{item.title}</p>
        <p className="text-sm text-neutral-600 group-hover:text-emerald-800">
          {item.description}
        </p>
      </div>
    </a>
  );

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-md font-medium transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 pl-2">
          {content.map((item, idx) => (
            <MobileDropdownItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileMenu: React.FC<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
}> = ({ mobileMenuOpen, setMobileMenuOpen, navItems }) => (
  <>
    <div
      className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
        mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setMobileMenuOpen(false)}
    />

    <div
      className={`fixed inset-y-0 left-0 w-full bg-white z-40 md:hidden transition-transform duration-300 ease-out ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full pt-20 pb-6 overflow-y-auto">
        <div className="flex flex-col p-4 space-y-2">
          {navItems.map((item, idx) =>
            item.dropdownContent ? (
              <MobileDropdown
                key={idx}
                title={item.name}
                content={item.dropdownContent}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            ) : (
              <a
                key={idx}
                href={item.link}
                className="px-4 py-3 text-lg font-medium hover:bg-neutral-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            )
          )}

          <ContactButton
            mobile={true}
            onClick={() => setMobileMenuOpen(false)}
            isScrolled={false}
          />
        </div>
      </div>
    </div>
  </>
);


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. SCROLL EFFECT LOGIC
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 2. NAVIGATION DATA
  const navItems: NavItem[] = useMemo(() => [
    {
      name: "Industries",
      link: "/industries",
      dropdownContent: [
        { title: "Retail", description: "Enhance store operations and predict consumer demand.", icon: "🛒", color: "bg-green-100", link: "/industries/retail" },
        { title: "CPG", description: "Optimize supply chains and manage fast-moving goods.", icon: "📦", color: "bg-orange-100", link: "/industries/cpg" },
        { title: "Media", description: "Personalize user feeds and analyze audience engagement.", icon: "🎬", color: "bg-emerald-100", link: "/industries/media" },
        { title: "Telecom & Tech", description: "Improve network performance and automate customer support.", icon: "📡", color: "bg-indigo-100", link: "/industries/telecom-tech" },
        { title: "Manufacturing", description: "Enable predictive maintenance and ensure quality control.", icon: "⚙️", color: "bg-yellow-100", link: "/industries/manufacturing" },
        { title: "Energy", description: "Optimize consumption and distribution with smart grids.", link: "/industries/energy", color: "bg-pink-100", icon: "💡" }
      ],
      featureCard: { title: "Retail", description: "Enhance store operations and predict consumer demand.", link: "/industries/retail", linear: "bg-linear-to-r from-emerald-200 to-emerald-400", icon: "🛒" },
    },
    {
      name: "Horizontals",
      link: "/horizontals",
      dropdownContent: [
        { title: "Marketing", description: "Generate content ideas and campaign summaries.", icon: "📢", color: "bg-orange-100", link: "/horizontals/marketing" },
        { title: "Consumer Science", description: "Understand customer behavior and predict trends.", icon: "🧑‍🔬", color: "bg-teal-100", link: "/horizontals/consumer-science" },
        { title: "AI Research", description: "Explore cutting-edge models and algorithms.", icon: "🧠", color: "bg-purple-100", link: "/horizontals/ai-research" },
        { title: "Supply Chain", description: "Manage logistics, inventory, and forecasting.", link: "/horizontals/supply-chain", color: "bg-amber-100", icon: "🚢" },
      ],
      featureCard: { title: "Marketing", description: "Generate content ideas and campaign summaries.", link: "/horizontals/marketing", linear: "bg-linear-to-r from-emerald-200 to-emerald-400", icon: "📢" },
    },
    {
      name: "Diagonals",
      link: "/diagonals",
      dropdownContent: [
        { title: "Consulting", description: "Provide strategic advice and implementation support.", icon: "🤝", color: "bg-orange-100", link: "/diagonals/consulting" },
        { title: "Data Engineering", description: "Build and maintain data pipelines and infrastructure.", icon: "🏗️", color: "bg-yellow-100", link: "/diagonals/data-engineering" },
        { title: "Data Science", description: "Develop predictive models and extract insights.", icon: "📊", color: "bg-purple-100", link: "/diagonals/data-science" },
        { title: "Operationalization", description: "Deploy and scale AI solutions in production.", icon: "🚀", color: "bg-pink-100", link: "/diagonals/operationalization" },
        { title: "AI & LLM", description: "Build and integrate large language models.", link: "/diagonals/ai-llm", color: "bg-indigo-100", icon: "🤖" },
      ],
      featureCard: { title: "Consulting", description: "Provide strategic advice and implementation support.", link: "/diagonals/consulting", linear: "bg-linear-to-r from-emerald-200 to-emerald-400", icon: "🤝" },
    },
    {
      name: "Company",
      link: "/company",
      dropdownContent: [
        { title: "About", description: "Discover who we are and what drives us.", icon: "👤", color: "bg-violet-100", link: "/company/about" },
        { title: "Careers", description: "Explore exciting opportunities to grow your career.", icon: "💼", color: "bg-pink-100", link: "/company/careers" },
        { title: "Press", description: "See our latest news and announcements.", link: "/company/press", color: "bg-cyan-100", icon: "📰" },
      ],
      featureCard: { title: "Culture", description: "Learn about our core values and team spirit.", link: "/company/culture", linear: "bg-linear-to-r from-emerald-200 to-emerald-400", icon: "✨" },
    }
  ], []);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 p-2 font-sans my-4">
        <div
          className={`md:mx-auto rounded-full border md:border backdrop-blur-lg md:shadow-sm bg-white/60 border-black/10 transition-all duration-600 ease-in-out ${
            isScrolled ? `md:max-w-4xl ` : `md:max-w-6xl`
          }`}
        >
          <div className="flex gap-2 justify-between items-center w-full px-4 py-2">
            <Logo isScrolled={isScrolled} />
            <DesktopNavigation navItems={navItems} />
            <ContactButton mobile={false} isScrolled={isScrolled} />
            <button
              className="md:hidden p-2 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navItems={navItems}
      />
    </>
  );
}