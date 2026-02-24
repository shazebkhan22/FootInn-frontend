import PricingCards from '@/components/shadcn-studio/blocks/pricing-component-01/pricing-component-01'

const pricingData = [
  {
    id: 'starter',
    title: 'Starter',
    subtitle: 'Perfect for single turf owners',
    price: 1999,
    priceNote: 'per month',
    buttonText: 'Start Free Trial',
    features: [
      'Manage 1 Turf',
      'Online slot booking system',
      'Basic customer management',
      'Manual payment tracking',
      'Daily booking reports',
      'Email support'
    ]
  },
  {
    id: 'growth',
    title: 'Growth',
    subtitle: 'For growing turf businesses',
    price: 4999,
    originalPrice: 6999,
    priceNote: 'per month',
    buttonText: 'Upgrade to Growth',
    features: [
      'Manage up to 3 Turfs',
      'Online payments (Razorpay / Stripe)',
      'Automated slot availability control',
      'Customer booking history',
      'Revenue & analytics dashboard',
      'Discount coupons & offers',
      'Priority support'
    ]
  },
  {
    id: 'pro',
    title: 'Pro',
    subtitle: 'For multi-location turf chains',
    price: 9999,
    originalPrice: 12999,
    priceNote: 'per month',
    buttonText: 'Get Pro Access',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Unlimited Turfs',
      'Multi-admin & staff roles',
      'Advanced analytics & revenue insights',
      'Automated WhatsApp booking confirmations',
      'Dynamic pricing (peak / off-peak)',
      'GST invoicing & tax reports',
      'Custom branding (your logo & domain)',
      'Priority 24/7 support'
    ]
  },
  // {
  //   id: 'enterprise',
  //   title: 'Enterprise',
  //   subtitle: 'Custom solution for large stadiums & franchises',
  //   price: 24999,
  //   priceNote: 'custom billing',
  //   buttonText: 'Contact Sales',
  //   features: [
  //     'Unlimited locations & staff',
  //     'API integrations',
  //     'Dedicated account manager',
  //     'Custom feature development',
  //     'On-site setup assistance',
  //     'Advanced financial reporting',
  //     'White-label mobile app',
  //     '24/7 premium support'
  //   ]
  // }
]

export default function PricingPage() {
  return <PricingCards pricingData={pricingData} />
}