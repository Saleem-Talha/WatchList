"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function LayoutCard({ children, title, subtitle, className = "" }: Props) {
  return (
    <section className={`h-full ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h1 className="text-2xl font-bold text-slate-900">{title}</h1>}
          {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}