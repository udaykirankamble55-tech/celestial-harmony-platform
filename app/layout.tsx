import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celestial Harmony Academy of Music | KPHB, Hyderabad",
  description: "The right way to learn music. Trinity College London Validated Course Provider. Guitar, Piano, Violin, Keyboard — KPHB Colony, Hyderabad. Call 9885297005.",
  keywords: "music academy hyderabad, trinity college london, guitar lessons kphb, piano lessons kukatpally, violin classes hyderabad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#080808" />
      </head>
      <body>{children}</body>
    </html>
  );
}
