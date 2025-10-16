"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutCard from "@/app/components/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        setError(data.message || data.error || "Login failed. Please try again.");
        return; 
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/dashboard"); 
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  }

  return (
    <LayoutCard title="Login" subtitle="Access your WatchList account">
      <div className="bg-white border border-slate-100 shadow rounded-2xl p-6 max-w-md">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Welcome back</h2>
        <p className="text-sm text-slate-600 mb-4">Sign in to manage your watchlist.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-600">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 border border-slate-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Email" />
          </div>
          <div>
            <label className="text-xs text-slate-600">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 border border-slate-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Password" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm">Login</button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          <a className="text-indigo-600 underline" href="/register">Don't have an account?</a>
        </div>
      </div>
    </LayoutCard>
  );
}
