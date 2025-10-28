"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(pathname);

  return (
    <div className="min-h-screen bg-slate-50">
      {!isPublic && <Navbar />}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {!isPublic && <Sidebar />}
        <main className={`flex-1 ${!isPublic ? "p-6" : ""}`}>
          <div className={`mx-auto max-w-6xl ${!isPublic ? "space-y-6" : ""}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}