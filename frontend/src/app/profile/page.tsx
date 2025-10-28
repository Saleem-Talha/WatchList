"use client";
import React, { useEffect, useState } from "react";
import RequireAuth from "@/app/components/RequireAuth";
import LayoutCard from "@/app/components/Layout";
import Logout from "@/app/components/Logout";

export default function ProfilePage() {
  const [user, setUser] = useState<{ username?: string; email?: string } | null>(null);

  useEffect(() => {
    // try to fetch profile if backend supports /api/auth/me
    (async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        setUser(data || null);
      } catch {
        // ignore
      }
    })();
  }, []);

  const initials =
    (user?.username || user?.email || "")
      .trim()
      .split(/\s|@/)[0]
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <RequireAuth>
      <LayoutCard title="Profile" subtitle="Your account details" className="my-20">
        {/* Glassy profile card */}
        <section className="relative max-w-2xl rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur">
          {/* subtle ornaments */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-2xl">
            <div className="absolute -left-24 -top-16 h-40 w-40 rounded-full bg-indigo-200/35 blur-2xl" />
            <div className="absolute -right-28 bottom-0 h-44 w-44 rounded-full bg-sky-200/35 blur-2xl" />
            <div className="absolute inset-0 rounded-2xl [background-image:linear-gradient(to_right,rgba(30,41,59,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,.05)_1px,transparent_1px)] [background-size:22px_22px]" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm">
                {initials}
              </div>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs text-indigo-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Account
                </span>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  Profile
                </h2>
                <p className="text-sm text-slate-700">
                  Manage your account information and preferences.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <Logout />
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-slate-100 bg-white/70 p-4 shadow-sm">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Username
              </label>
              <div className="mt-1 text-slate-900">
                {user?.username ?? <span className="text-slate-500">Not provided</span>}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white/70 p-4 shadow-sm">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Email
              </label>
              <div className="mt-1 text-slate-900">
                {user?.email ?? <span className="text-slate-500">Not provided</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-slate-500">
                Your data is private by default. No ads • No trackers
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                  type="button"
                >
                  Edit profile
                </button>
                <button
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  type="button"
                >
                  Change password
                </button>
              </div>
            </div>
          </div>
        </section>
      </LayoutCard>
    </RequireAuth>
  );
}
