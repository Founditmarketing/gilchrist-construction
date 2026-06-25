import type { Metadata, Viewport } from "next";
import { Saira_Condensed, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./gilchrist.css";
import GcShell from "./_components/GcShell";

// Saira Condensed: an engineered condensed grotesque, set UPPERCASE — highway
// signage made monumental.
const display = Saira_Condensed({
  variable: "--gc-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Geist: the modern, screen-legible body/UI face.
const body = Geist({
  variable: "--gc-body",
  subsets: ["latin"],
  display: "swap",
});

// Geist Mono: the surveyor's layer — stations, data, phone, addresses.
const mono = Geist_Mono({
  variable: "--gc-mono",
  subsets: ["latin"],
  display: "swap",
});

const GC_TITLE =
  "Gilchrist Construction Company | Heavy-Civil & Highway Contractor — Alexandria, LA";
const GC_DESC =
  "A Louisiana DOTD prime contractor since 1981 — self-performed asphalt, concrete, bridges and earthwork for the state's roads, and a career building them. Alexandria, LA.";

const OG_IMAGE = "/gilchrist/raw/field-4.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://gilchrist-construction.vercel.app"),
  title: GC_TITLE,
  description: GC_DESC,
  keywords: [
    "heavy civil contractor Louisiana",
    "highway contractor Alexandria LA",
    "bridge construction Louisiana",
    "asphalt paving Louisiana",
    "DOTD contractor",
    "design-build Louisiana",
    "Gilchrist Construction",
    "construction careers Louisiana",
  ],
  alternates: { canonical: "/" },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Gilchrist" },
  openGraph: {
    title: GC_TITLE,
    description: GC_DESC,
    type: "website",
    siteName: "Gilchrist Construction Company",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1000, height: 750, alt: "A Louisiana highway built by Gilchrist Construction" }],
  },
  twitter: { card: "summary_large_image", title: GC_TITLE, description: GC_DESC, images: [OG_IMAGE] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0e0f",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} gc-scope flex min-h-[100dvh] flex-col`}>
        <GcShell>{children}</GcShell>
      </body>
    </html>
  );
}
