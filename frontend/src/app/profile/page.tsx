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

  return (
    <RequireAuth>
      <LayoutCard title="Profile" subtitle="Your account details">
        <div className="bg-white border border-slate-100 shadow rounded-2xl p-6 max-w-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Account</h2>
              <p className="text-sm text-slate-700">Manage your account information and preferences.</p>
            </div>
            <div>
              <Logout />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <div>
              <label className="text-xs text-slate-700">Username</label>
              <div className="mt-1 text-slate-900">{user?.username ?? <span className="text-slate-500">Not provided</span>}</div>
            </div>

            <div>
              <label className="text-xs text-slate-700">Email</label>
              <div className="mt-1 text-slate-900">{user?.email ?? <span className="text-slate-500">Not provided</span>}</div>
            </div>

            <div className="pt-3">
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Edit profile</button>
            </div>
          </div>
        </div>
      </LayoutCard>
    </RequireAuth>
  );
}