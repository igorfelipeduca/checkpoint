import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Checkpoint",
  description:
    "Checkpoint is an open-source platform that make it possible for you to share your experience with various games. Our main purpose is to unite the community to build an indie project that represents one of our favorite activities: gaming.",
  twitter: {
    card: "summary_large_image",
    site: "https://checkpoint.duca.dev",
    creator: "@ducaswtf",
    title: "Checkpoint",
    description:
      "Checkpoint is an open-source platform that make it possible for you to share your experience with various games.",
    images: ["/print.png"],
  },
  openGraph: {
    locale: "pt_BR",
    url: "https://checkpoint.duca.dev",
    title:
      "Checkpoint - Checkpoint is an open-source platform that make it possible for you to share your experience with various games.",
    description:
      "Checkpoint is an open-source platform that make it possible for you to share your experience with various games.",
    type: "website",
    images: ["/print.png"],
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
