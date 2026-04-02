import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CheckIt | Protocol Registry Explorer",
  description: "High-fidelity explorer for Products, Posts, and Users data protocols.",
};

import { QueryProvider } from "@/providers/QueryProvider";
import { SyncUrl } from "@/components/global/SyncUrl";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${quicksand.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Suspense fallback={null}>
            <SyncUrl />
          </Suspense>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
