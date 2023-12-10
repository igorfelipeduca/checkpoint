import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Checkpoint",
  description:
    "Checkpoint is a web app that will allow you and your friends to share your experiences and checkpoints at video games",
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
