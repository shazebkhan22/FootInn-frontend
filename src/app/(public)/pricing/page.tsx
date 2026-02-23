import PricingCards from '@/components/shadcn-studio/blocks/pricing-component-01/pricing-component-01'

const pricingData = [
  {
    id: 'free',
    title: 'Free',
    subtitle: 'Access to all free components',
    price: 0,
    buttonText: 'Browse free components',
    features: [
      'Access to all free components',
      'Copy and paste, no complexity',
      'Built with Next.js, React, Tailwind CSS & Framer Motion',
      'Fully responsive and customizable',
      'Documentation and examples included'
    ]
  },
  {
    id: 'annual',
    title: 'Annual Access',
    subtitle: 'Paid yearly',
    price: 169,
    originalPrice: 249,
    priceNote: 'per year',
    buttonText: 'Get Annual Access',
    features: [
      'Access to 60+ premium Component Blocks',
      'Access to 12+ ready-to-use Templates',
      '1 year of updates and new features',
      'AI-ready prompts for Lovable, V0 and more',
      'Private Discord community access',
      '48-hour dedicated support turnaround'
    ]
  },
  {
    id: 'lifetime',
    title: 'Lifetime Access',
    subtitle: 'One-time Purchase',
    price: 199,
    originalPrice: 299,
    priceNote: 'One-time payment',
    buttonText: 'Get Lifetime Access',
    highlighted: true,
    badge: 'Most popular',
    features: [
      'Access to 60+ premium Component Blocks',
      'Access to 12+ ready-to-use Templates',
      'Lifetime updates for all content',
      'Access to all future releases',
      'Private Discord community access',
      '48-hour dedicated support turnaround',
      'AI-ready prompts for Lovable, V0 and more'
    ]
  },
  {
    id: 'team',
    title: 'Team',
    subtitle: 'One-time Purchase',
    price: 1590,
    originalPrice: 1990,
    priceNote: '10 team members included',
    buttonText: 'Get Teams Access',
    features: [
      '10 team members included',
      'Access to 60+ premium Component Blocks',
      'Access to 12+ ready-to-use Templates',
      'Lifetime updates for all content',
      'Access to all future releases',
      'Private Discord community access',
      '48-hour dedicated support turnaround'
    ]
  }
]

export default function PricingPage() {
  return <PricingCards pricingData={pricingData} />
}