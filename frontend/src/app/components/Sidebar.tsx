"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faList,
  faCalendarAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Sidebar — styled to match the LandingPage aesthetic:
 * - Soft glass panel: bg-white/80, backdrop-blur, thin borders, subtle shadow
 * - Rounded geometry and micro-ornaments (blur blobs + grid)
 * - Indigo accents for active states, slate neutrals for rest
 */
export default function Sidebar() {
  const pathname = usePathname() || "/";

  const items = [
    { href: "/dashboard", label: "Dashboard", icon: faTachometerAlt },
    { href: "/add-media", label: "Add Media", icon: faPlus },
    { href: "/media-list", label: "All Media", icon: faList },
    { href: "/planned", label: "Watch Later", icon: faCalendarAlt },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={[
        "sticky top-16 left-0", // Changed from 'fixed' to 'sticky'
        "h-[calc(100vh-4rem)]",
        "w-64", // Added flex-shrink-0 to prevent shrinking
        "overflow-y-auto overflow-x-hidden", // Added overflow-x-hidden here
        "border-r border-slate-200",
        "bg-white/80 backdrop-blur",
      ].join(" ")}
      aria-label="Primary"
    >
      {/* Background ornaments (subtle, non-interactive) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 -top-12 h-40 w-40 rounded-full bg-indigo-200/35 blur-2xl" />
        <div className="absolute -right-20 bottom-10 h-44 w-44 rounded-full bg-sky-200/35 blur-2xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(30,41,59,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,.06)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Header */}
      <div className="mb-3 flex items-center justify-between px-2 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
          No ads • Private
        </span>
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        {items.map((it) => {
          const active = isActive(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={[
                "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={[
                  "inline-flex h-7 w-7 items-center justify-center rounded-lg",
                  active
                    ? "bg-white/20"
                    : "bg-slate-100 text-slate-600 group-hover:bg-slate-200",
                  "transition",
                ].join(" ")}
              >
                <FontAwesomeIcon
                  icon={it.icon}
                  className={active ? "text-white" : "text-slate-700"}
                />
              </span>
              <span className="truncate">{it.label}</span>
              {active && (
                <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium">
                  Active
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer helper - removed absolute positioning */}
      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-slate-100 bg-white/80 p-3 shadow-sm backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Tip
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Use <span className="font-medium text-slate-800">Add Media</span> to
            queue movies, series & anime fast. Set a reminder to get an email
            nudge on time.
          </p>
        </div>
      </div>
    </aside>
  );
}
