"use client";
import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Layout({ title, subtitle, children }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h1 className="text-3xl leading-tight font-extrabold text-slate-900">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-slate-700 max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>
            {/* <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600 font-medium">WatchList</span>
              <div className="h-8 w-px bg-slate-200" />
              <a
                href="/"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Home
              </a>
            </div> */}
          </div>
        </header>

        <div className="space-y-6">{children}</div>
      </div>
    </main>
  );
}