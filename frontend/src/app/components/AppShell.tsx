"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

/**
 * AppShell - renders navbar + sidebar for main app routes.
 * Hides navigation for public pages (landing, login, register).
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  // routes that should use the public layout (no navbar/sidebar)
  const publicRoutes = ["/", "/login", "/register"];
  const hide = publicRoutes.some((p) => pathname === p || pathname.startsWith(p + "/"));

  return (
    <>
      {!hide && <Navbar />}
      <div className="flex">
        {!hide && <Sidebar />}
        <main className={`flex-1 bg-slate-50 p-4 ${!hide ? "ml-64" : ""}`}>
          {children}
        </main>
      </div>
    </>
  );
}