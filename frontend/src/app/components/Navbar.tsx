"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faCalendarAlt,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";

/**
 * Navbar — styled to match your Landing/Sidebar look:
 * - Translucent glass bar with blur, thin border, soft shadow
 * - Indigo primary accents, slate neutrals
 * - Rounded badges, tight typography, focus rings
 * - Active state: indigo pill + subtle halo
 */
export default function Navbar() {
  const pathname = usePathname() || "/";

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-40",
        "border-b border-slate-100 bg-white/80 backdrop-blur shadow-sm",
      ].join(" ")}
      role="navigation"
      aria-label="Top"
    >
      {/* subtle grid ornament */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(30,41,59,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,.05)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <FontAwesomeIcon icon={faHome} />
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-none text-slate-900">
                WatchList
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                Track movies, series & anime
              </p>
            </div>
          </Link>
        </div>

        {/* Primary actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NavItem
            href="/media-list"
            label="Library"
            icon={faList}
            active={isActive("/media-list")}
          />
          <NavItem
            href="/planned"
            label="Planned"
            icon={faCalendarAlt}
            active={isActive("/planned")}
          />

          <Link
            href="/add-media"
            className={[
              "ml-1 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition",
              "bg-indigo-600 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
            ].join(" ")}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="hidden sm:inline">Add</span>
          </Link>

          <Link
            href="/profile"
            className={[
              "ml-1 inline-flex items-center justify-center rounded-xl px-2.5 py-2 text-slate-700 transition",
              "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
            ].join(" ")}
            aria-label="Profile"
          >
            <FontAwesomeIcon icon={faUser} />
          </Link>

          <div className="ml-1">
            <Logout />
          </div>
        </div>
      </div>
    </nav>
  );
}

/** Small helper component for consistent nav pills */
function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-slate-700 hover:bg-slate-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-6 w-6 items-center justify-center rounded-lg transition",
          active ? "bg-white/20" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200",
        ].join(" ")}
      >
        <FontAwesomeIcon icon={icon} className={active ? "text-white" : ""} />
      </span>
      <span className="hidden sm:inline">{label}</span>
      {active && (
        <span className="ml-1 hidden rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium sm:inline">
          Active
        </span>
      )}
    </Link>
  );
}
