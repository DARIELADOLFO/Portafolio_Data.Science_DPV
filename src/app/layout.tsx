import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://darielpena.ai"),
  title: {
    default: "Dariel Pena | AI Data Systems",
    template: "%s | Dariel Pena"
  },
  description:
    "Premium AI, data science, machine learning and business intelligence product experience by Dariel Pena.",
  keywords: [
    "Data Scientist",
    "AI Engineer",
    "Business Intelligence",
    "Machine Learning",
    "Power BI",
    "Python",
    "Portfolio"
  ],
  openGraph: {
    title: "Dariel Pena | AI Data Systems",
    description:
      "A premium AI laboratory showcasing data science, ML, analytics and executive BI systems.",
    type: "website",
    images: ["/images/ai-lab-core.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dariel Pena | AI Data Systems",
    description:
      "Data science, AI engineering and business intelligence presented as a premium software product."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} dark scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  );
}
