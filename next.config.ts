import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy Consolidation for ~9,500 legacy URLs to eliminate Scaled Content Abuse risk
      {
        source: "/food-donation",
        destination: "/donate-food",
        permanent: true,
      },
      {
        source: "/food-donation/:path*",
        destination: "/donate-food",
        permanent: true,
      },
      {
        source: "/donate-in-kolkata",
        destination: "/donate-food/west-bengal/kolkata/kolkata",
        permanent: true,
      },
      {
        source: "/leftover-food",
        destination: "/donate/wedding/in/kolkata",
        permanent: true,
      },
      {
        source: "/leftover-food/:path*",
        destination: "/donate-food",
        permanent: true,
      },
      {
        source: "/wedding-food-donation",
        destination: "/donate/wedding/in/kolkata",
        permanent: true,
      },
      {
        source: "/birthday-food-donation",
        destination: "/donate/birthday/in/kolkata",
        permanent: true,
      },
      {
        source: "/hunger-statistics",
        destination: "/reports/state-of-food-waste",
        permanent: true,
      },
      {
        source: "/food-waste-india",
        destination: "/reports/state-of-food-waste",
        permanent: true,
      },
      {
        source: "/volunteer-kolkata",
        destination: "/volunteer/west-bengal/kolkata",
        permanent: true,
      },
      {
        source: "/csr-food-donation",
        destination: "/enterprise/brsr-calculator",
        permanent: true,
      },
      {
        source: "/fssai-food-donation",
        destination: "/compliance/fssai-schedule-1",
        permanent: true,
      },
      {
        source: "/fssai-guidelines",
        destination: "/compliance/fssai-schedule-1",
        permanent: true,
      },
      {
        source: "/free-food",
        destination: "/assistance",
        permanent: true,
      },
      {
        source: "/free-food/:path*",
        destination: "/assistance",
        permanent: true,
      },
      {
        source: "/food-bank-near-me",
        destination: "/action-hub",
        permanent: true,
      },
      {
        source: "/ngo-list",
        destination: "/ngo-directory/west-bengal/kolkata",
        permanent: true,
      },
      {
        source: "/ngo-list/:path*",
        destination: "/ngo-directory",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
