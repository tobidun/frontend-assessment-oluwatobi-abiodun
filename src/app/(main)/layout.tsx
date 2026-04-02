import { Header } from "@/components/global/Header";
import { RegistryStats } from "@/components/global/RegistryStats";
import { RegistryStatsSkeleton } from "@/components/ui/skeletons";
import React, { Suspense } from "react";

/**
 * Main Layout Group
 * Shared UI components for the core registry pages (Products, Posts, Users).
 */
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <div className="bg-[#FFFFFF] border-b border-slate-100 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
             <Suspense fallback={<RegistryStatsSkeleton />}>
                <RegistryStats />
             </Suspense>
          </div>
        </div>
        {children}
      </main>
    </>
  );
}
