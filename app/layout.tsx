import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://celestialharmonyacademy.in"),
  title: "Celestial Harmony Academy of Music | KPHB, Hyderabad",
  description:
    "The right way to learn music. Trinity College London Validated Course Provider. Guitar, Piano, Violin, Keyboard — KPHB Colony, Hyderabad. Call 9885297005.",
  keywords: [
    "music academy hyderabad",
    "trinity college london",
    "guitar lessons kphb",
    "piano lessons kukatpally",
    "violin classes hyderabad",
    "keyboard classes in kphb",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Celestial Harmony Academy of Music | KPHB, Hyderabad",
    description:
      "Trinity College London Validated Music Academy. Guitar, Piano, Keyboard, Violin & Vocals in KPHB Colony.",
    url: "https://celestialharmonyacademy.in",
    siteName: "Celestial Harmony Academy of Music",
    images: [
      {
        url: "/groupclick2.jpg", // Social preview picture
        width: 1200,
        height: 630,
        alt: "Celestial Harmony Academy Students and Faculty Group Photo KPHB",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celestial Harmony Academy of Music | KPHB, Hyderabad",
    description:
      "Trinity College London Validated Music Academy in KPHB Colony.",
    images: ["/groupclick2.jpg"],
  },
  verification: {
    google: "XbCTKrjlOAt-Sjk_Ved2F2Pwz2FFNKWwxx0dje7LNQ8",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Structured Schema.org data for Google Search SEO & Image Thumbnails
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    "name": "Celestial Harmony Academy of Music",
    "url": "https://celestialharmonyacademy.in",
    "logo": "https://celestialharmonyacademy.in/logo-upscaled-2048.png",
    "image": [
      "https://celestialharmonyacademy.in/groupclick2.jpg",
      "https://celestialharmonyacademy.in/certificate3.jpeg",
      "https://celestialharmonyacademy.in/examiner2.jpeg"
    ],
    "description": "Trinity College London Validated Course Provider in KPHB Colony, Kukatpally, Hyderabad.",
    "telephone": "+919885297005",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "HIGH 68, Dr. Rao's ENT Hospital Temple Bus Stop, Phase 3, KPHB Phase 2",
      "addressLocality": "Kukatpally, Hyderabad",
      "postalCode": "500072",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4933,
      "longitude": 78.3986
    },
    "sameAs": [
      "https://celestialharmonyacademy.in"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}