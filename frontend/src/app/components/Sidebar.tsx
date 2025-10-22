"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faList, faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const items = [
    { href: "/dashboard", label: "Dashboard", icon: faTachometerAlt },
    { href: "/add-media", label: "Add Media", icon: faPlus },
    { href: "/media-list", label: "All Media", icon: faList },
    { href: "/planned", label: "Watch Later", icon: faCalendarAlt },
  ];

  const isActive = (href: string) =>
    pathname === href ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50";

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 p-4">
      <nav className="space-y-2">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${isActive(it.href)}`}>
            <span className="text-lg text-slate-600"><FontAwesomeIcon icon={it.icon} /></span>
            <span>{it.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}