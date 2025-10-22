"use client";
import React from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-start">
      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        {children}
      </div>
    </div>
  );
}