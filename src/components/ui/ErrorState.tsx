"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHome?: boolean;
}

export const ErrorState = ({
  title = "Oops! Something went wrong.",
  message = "We couldn't load the necessary data. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-700 overflow-hidden">
      <div className="relative w-full max-w-[180px] aspect-square mb-3 pointer-events-none">
        <Image
          src="/error.png"
          alt="Error Illustration"
          fill
          sizes="180px"
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-slate-500 font-medium text-sm leading-relaxed">
          {message}
        </p>

        <div className="pt-4 flex items-center justify-center">
          <button
            onClick={() => onRetry ? onRetry() : window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all active:scale-95 shadow-sm text-xs uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-slate-400" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
