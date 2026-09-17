import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { JsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#065f46",
};

export const metadata: Metadata = {
  title: {
    template: "%s | DonateFood.in - National Food Rescue DPI",
    default: "DonateFood.in | India's National Digital Food Rescue & Hunger-Response Network",
  },
  description:
    "A free digital public infrastructure (DPI) connecting food donors with verified NGOs across India. Algorithmic DVRPTW routing, FSSAI compliance, NITI Aayog Darpan verification, and NDMA emergency response.",
  keywords: [
    "donate food near me",
    "leftover wedding food donation",
    "free food near me",
    "community kitchen India",
    "langar",
    "roti bank",
    "FSSAI food surplus regulation",
    "NITI Aayog Darpan NGO",
    "corporate CSR food donation Schedule VII",
  ],
  authors: [{ name: "DonateFood.in Digital Public Infrastructure Group" }],
  creator: "DonateFood.in",
  publisher: "DonateFood.in",
  metadataBase: new URL("https://donatefood.in"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/?lang=en",
      "hi-IN": "/?lang=hi",
      "bn-IN": "/?lang=bn",
      "ta-IN": "/?lang=ta",
      "te-IN": "/?lang=te",
      "mr-IN": "/?lang=mr",
    },
  },
  openGraph: {
    title: "DonateFood.in | India's National Digital Food Rescue Network",
    description:
      "A free digital public utility connecting surplus food with hunger-alleviation networks across 800+ Indian districts.",
    url: "https://donatefood.in",
    siteName: "DonateFood.in",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <head>
        <JsonLd type="Organization" data={{}} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
