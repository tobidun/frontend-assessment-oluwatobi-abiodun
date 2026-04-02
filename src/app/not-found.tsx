"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * 404 Page (Ultra-Compact)
 * Reduced spacing for a tighter, more cohesive look.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center overflow-hidden">
      <div className="relative w-full max-w-[280px] aspect-square -mb-6 animate-in fade-in zoom-in duration-500">
        <Image
          src="/404.png"
          alt="404 Page"
          fill
          sizes="280px"
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-md space-y-4 animate-in slide-in-from-bottom-2 duration-500">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            This page doesn&apos;t exist or has been relocated.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            icon={ArrowLeft}
            onClick={() => window.history.back()}
            className="px-8 !rounded-xl h-10"
          >
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
}
