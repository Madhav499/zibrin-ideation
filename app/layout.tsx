import type { Metadata } from "next";
import { Inter, Orbitron, Syne } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/lenis-provider";
import TransitionProvider from "@/providers/transition-provider";
import WebglEngineProvider from "@/providers/webgl-engine-provider";
import PageTransitionWrapper from "@/components/page-transition-wrapper";
import CustomCursor from "@/features/cursor/cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zibrin Infotech | Infinite Development & AI Laboratory",
  description:
    "We don't just develop software; we engineer the infinite future. Next-generation digital engineering laboratory specializing in custom AI Agent deployment, advanced full-stack software, and search engine optimization (SEO/AEO/GEO).",
  keywords: [
    "Zibrin Infotech",
    "Digital Engineering Lab",
    "Futuristic Web Development",
    "AI Agent Engineering",
    "NextJS Development Lab",
    "Advanced SEO",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
    "AEO GEO Strategy",
    "Möbius Software Design",
  ],
  authors: [{ name: "Zibrin Engineering Systems" }],
  creator: "Zibrin Infotech",
  publisher: "Zibrin Infotech",
  robots: "index, follow",
  alternates: {
    canonical: "https://zibrin.info",
  },
  openGraph: {
    title: "Zibrin Infotech | Infinite Development & AI Laboratory",
    description:
      "Enter the headquarters of a next-generation technology civilization. We design, deploy, and scale custom AI ecosystems and state-of-the-art architectures.",
    url: "https://zibrin.info",
    siteName: "Zibrin Infotech",
    images: [
      {
        url: "https://zibrin.info/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zibrin Infotech - Engineering the Infinite Future",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zibrin Infotech | Infinite Development & AI Laboratory",
    description:
      "We don't just develop software; we engineer the infinite future. Discover Next-Gen full-stack engineering.",
    images: ["https://zibrin.info/og-image.png"],
    creator: "@zibrin_infotech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Data for SEO/AEO/GEO indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentBenefitsService",
    "name": "Zibrin Infotech Digital Engineering",
    "description": "Enterprise software engineering, customized generative AI models, automation workflows, and peak performance technical layouts.",
    "url": "https://zibrin.info",
    "logo": "https://zibrin.info/logo.png",
    "sameAs": [
      "https://github.com/zibrin-infotech",
      "https://linkedin.com/company/zibrin-infotech"
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-space-black text-white relative">
        <TransitionProvider>
          <LenisProvider>
            {/* Cyber Grid background */}
            <div className="cyber-grid" />
            
            {/* Scan overlay grid */}
            <div className="noise-overlay" />
            
            {/* Interactive Intelligent Cursor */}
            <CustomCursor />

            {/* Root WebGL-First Master Engine Provider */}
            <WebglEngineProvider>
              {/* HTML Content Overlays with 3D Spatial Perspective Wrapper */}
              <PageTransitionWrapper>
                <div className="relative z-10 flex flex-col flex-1">{children}</div>
              </PageTransitionWrapper>
            </WebglEngineProvider>
          </LenisProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}



