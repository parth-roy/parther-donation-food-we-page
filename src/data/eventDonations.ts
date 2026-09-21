export interface EventDonationConfig {
  eventSlug: string;
  eventName: string;
  heroHeadline: string;
  heroSubheadline: string;
  culturalSignificance: string;
  packages: {
    title: string;
    beneficiariesFed: number;
    amountInr: number;
    description: string;
    deliverables: string[];
  }[];
  urgencyTimeline: string;
  faqs: { question: string; answer: string }[];
}

export const EVENT_DONATION_CONFIGS: Record<string, EventDonationConfig> = {
  birthday: {
    eventSlug: "birthday",
    eventName: "Birthday Food Sponsorship",
    heroHeadline: "Celebrate Your Birthday by Sponsoring Nutritious Meals for Children & Elders",
    heroSubheadline: "Turn your special milestone into nourishment. Sponsor a freshly cooked community feast with 80G tax receipt and video confirmation.",
    culturalSignificance: "Sharing food (Annadanam) on birthdays brings auspicious blessings, good health, and immense joy to underprivileged communities.",
    packages: [
      {
        title: "Joy of Giving - 50 Kids Meal",
        beneficiariesFed: 50,
        amountInr: 2500,
        description: "Fresh warm lunch (Rice, Dal, Seasonal Curry, Sweet/Fruit) for 50 shelter children.",
        deliverables: [
          "Instant 80G Tax Exemption Certificate (50% Tax deduction)",
          "HD Digital Photo/Video Proof with your name banner",
          "Digital Certificate of Appreciation for social sharing",
        ],
      },
      {
        title: "Celebration Feast - 100 Beneficiaries",
        beneficiariesFed: 100,
        amountInr: 4900,
        description: "Full wholesome thali with festive sweet for 100 shelter residents and elders.",
        deliverables: [
          "Instant 80G Tax Exemption Certificate",
          "Personalized cake cutting / celebration video clip",
          "Detailed nutritional delivery verification report",
        ],
      },
      {
        title: "Community Kitchen Sponsor - 250 Meals",
        beneficiariesFed: 250,
        amountInr: 11900,
        description: "Sponsor an entire afternoon feeding program at a partner community kitchen.",
        deliverables: [
          "Dedicated donor signboard at the distribution point",
          "Full video documentary of meal distribution",
          "80G Tax Exemption Certificate & Auditor Receipt",
        ],
      },
    ],
    urgencyTimeline: "Book 24 to 48 hours in advance, or order same-day express feeding before 11:00 AM.",
    faqs: [
      {
        question: "Will I receive proof that food was distributed on my birthday?",
        answer: "Yes! Our verified NGO partners capture high-resolution photos and video clips featuring your name on a celebration whiteboard, delivered via WhatsApp and email within 4 hours of distribution.",
      },
      {
        question: "Is the donation 80G tax exempt?",
        answer: "Absolutely. All meal sponsorships are processed through registered 80G certified charitable trusts under Section 80G of the Indian Income Tax Act. Your digital certificate is generated instantly.",
      },
      {
        question: "Can I physically attend the birthday feeding program?",
        answer: "Yes! If you are in the local city, you are welcome to visit our partner community kitchen or shelter home and personally hand out the meals to children and residents.",
      },
    ],
  },
  wedding: {
    eventSlug: "wedding",
    eventName: "Wedding Leftover & Banquet Food Rescue",
    heroHeadline: "Zero Wedding Food Waste: Rapid Leftover Food Pickup & Midnight Distribution",
    heroSubheadline: "Don't let exquisite banquet food go to waste. Our insulated refrigerated vans collect untouched wedding surplus and feed hungry night-shelter families within 90 minutes.",
    culturalSignificance: "Indian weddings are celebrations of abundance. Ensuring unconsumed feasts reach hungry stomachs turns wedding blessings into lifelines.",
    packages: [
      {
        title: "Emergency Wedding Surplus Express Pickup",
        beneficiariesFed: 150,
        amountInr: 0,
        description: "Free emergency rescue dispatch for caterers and families with surplus food exceeding 30 portions.",
        deliverables: [
          "FSSAI-certified food temperature & sensory quality inspection",
          "Insulated stainless steel container collection at venue",
          "Live GPS dispatch tracking and impact confirmation report",
        ],
      },
      {
        title: "Wedding Reception Zero-Waste Partner",
        beneficiariesFed: 300,
        amountInr: 3500,
        description: "Dedicated on-site food safety coordinator and standby collection van throughout your reception dinner.",
        deliverables: [
          "On-site FSSAI Schedule I hygiene supervisor",
          "Zero-Waste Wedding Green Event Certificate for the couple",
          "Comprehensive metrics report: Kg rescued, meals served, methane prevented",
        ],
      },
    ],
    urgencyTimeline: "Call dispatch at least 2 hours before banquet conclusion, or book in advance for guaranteed night fleet standby.",
    faqs: [
      {
        question: "What kinds of wedding food can you collect?",
        answer: "We collect untouched cooked food that has been maintained above 60°C or refrigerated below 7°C, including rice, rotis, curries, lentils, paneer, and sweets. We cannot accept half-eaten table leftovers.",
      },
      {
        question: "How quickly does the rescue van arrive?",
        answer: "Our urban response fleet reaches banquet halls within 45–60 minutes in major cities like Kolkata, Mumbai, Delhi, Bengaluru, and Chennai.",
      },
      {
        question: "Is there any legal liability for the caterer or host?",
        answer: "None. FSSAI's 2019 Surplus Food Regulations and the Food Safety and Standards Act protect bona fide food donors donating in good faith under verified hygiene protocols.",
      },
    ],
  },
  anniversary: {
    eventSlug: "anniversary",
    eventName: "Anniversary Food Sponsorship",
    heroHeadline: "Celebrate Years of Togetherness by Nourishing Vulnerable Families",
    heroSubheadline: "Mark your anniversary with compassion. Sponsor warm wholesome meals for elderly care homes and child shelters.",
    culturalSignificance: "Honoring enduring love through charity creates lasting goodwill and meaningful societal impact.",
    packages: [
      {
        title: "Silver Milestone - 60 Meals",
        beneficiariesFed: 60,
        amountInr: 2900,
        description: "Wholesome meal distribution in an elderly welfare home with fruit and dairy dessert.",
        deliverables: [
          "Instant 80G Exemption Receipt",
          "Personalized photo montage of beneficiaries sharing the feast",
          "Commemorative Green Milestone Certificate",
        ],
      },
      {
        title: "Golden Jubilee - 150 Meals",
        beneficiariesFed: 150,
        amountInr: 7200,
        description: "Full daily meal distribution across two community kitchens.",
        deliverables: [
          "Instant 80G Exemption Receipt",
          "Full video message from the partner charity organization",
          "Social impact certificate verifying hunger relief impact",
        ],
      },
    ],
    urgencyTimeline: "Reserve 24 hours in advance.",
    faqs: [
      {
        question: "Can I dedicate the meal in someone's memory or honor?",
        answer: "Yes, you can specify dedication names and messages which will be prominently displayed on the distribution day banner.",
      },
    ],
  },
  "corporate-event": {
    eventSlug: "corporate-event",
    eventName: "Corporate Event & Conference Food Rescue",
    heroHeadline: "Turn Corporate Conferences & Offsites into Zero-Waste Green Events",
    heroSubheadline: "Automated FSSAI Schedule I compliant surplus collection for corporate catering, annual general meetings, and tech summits.",
    culturalSignificance: "Align corporate events with BRSR ESG goals and ESG Principle 6 environmental accountability.",
    packages: [
      {
        title: "Corporate Banquet Surplus Collection",
        beneficiariesFed: 200,
        amountInr: 5000,
        description: "Professional refrigerated logistics pickup with formal BRSR Scope 3 waste diversion certification.",
        deliverables: [
          "SEBI BRSR compliant Scope 3 GHG emissions reduction certificate",
          "Formal FSSAI Schedule I chain of custody handover documentation",
          "High-res event impact photos for corporate sustainability disclosures",
        ],
      },
    ],
    urgencyTimeline: "Book 48 hours in advance for corporate campus event standby.",
    faqs: [
      {
        question: "Can this be counted towards our BRSR Core ESG disclosure?",
        answer: "Yes, our certified waste diversion receipts quantify exact kilograms recovered and methane emissions avoided under GHG Protocol Scope 3 Category 5.",
      },
    ],
  },
};

export function getEventDonationConfig(eventSlug: string): EventDonationConfig {
  return EVENT_DONATION_CONFIGS[eventSlug] || EVENT_DONATION_CONFIGS["birthday"];
}
