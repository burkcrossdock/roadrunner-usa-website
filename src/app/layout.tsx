import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Onest } from "next/font/google";
import { Suspense } from "react";
import { site, siteUrl } from "@/config/site";
import { HeaderFallback, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const fragment = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.brand} · Dry van truckload, SoCal to Dallas`,
    template: `%s · ${site.brand}`,
  },
  description: `${site.legalName} runs company-operated dry vans, full truckload, between Southern California and Dallas. Based in North Carolina. ${site.phone}.`,
  applicationName: site.brand,
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand} · ${site.tagline}`,
    description: `${site.legalName} hauls dry van full truckloads on the Southern California–Dallas round trip.`,
  },
};

export const viewport: Viewport = {
  themeColor: "#101410",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TruckingCompany",
  name: site.legalName,
  alternateName: site.brand,
  slogan: site.tagline,
  url: siteUrl,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressRegion: "NC",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:30",
      closes: "16:00",
    },
  ],
  areaServed: ["Southern California", "Dallas, TX", "North Carolina"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${onest.variable} ${fragment.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Suspense fallback={<HeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
