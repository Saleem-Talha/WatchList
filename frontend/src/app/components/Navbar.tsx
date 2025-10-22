"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faCalendarAlt, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";

export default function Navbar() {
  const pathname = usePathname() || "/";

  const isActive = (path: string) =>
    pathname === path ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50";

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="text-indigo-600 bg-indigo-50 p-2 rounded-md">
              <FontAwesomeIcon icon={faHome} />
            </span>
            <span className="text-lg font-semibold text-slate-900">WatchList</span>
          </Link>
          <span className="text-sm text-slate-600 hidden sm:inline">Track movies, series & anime</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/media-list" className={`px-3 py-1 rounded-md text-sm font-medium ${isActive("/media-list")}`}>
            <FontAwesomeIcon icon={faList} className="mr-2" /> Library
          </Link>
          <Link href="/planned" className={`px-3 py-1 rounded-md text-sm font-medium ${isActive("/planned")}`}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Planned
          </Link>
          <Link href="/add-media" className="ml-2 px-3 py-1 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
          </Link>

          <Link href="/profile" className="ml-3 px-3 py-1 rounded-md text-sm text-slate-700 hover:bg-slate-50">
            <FontAwesomeIcon icon={faUser} />
          </Link>

          <div className="ml-3">
            <Logout />
          </div>
        </div>
      </div>
    </nav>
  );
}