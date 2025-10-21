"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutCard from "@/app/components/Layout";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  }
  return (
    <LayoutCard title="Create an account" subtitle="Sign up to start building your personal watchlist.">
      <div className="bg-white border border-slate-100 shadow rounded-2xl p-6 max-w-md">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Create an account</h2>
        <p className="text-sm text-slate-700 mb-4">No credit card required — get started in seconds.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-700">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="mt-1 border border-slate-200 rounded-md px-3 py-2 w-full text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="text-xs text-slate-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="mt-1 border border-slate-200 rounded-md px-3 py-2 w-full text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="text-xs text-slate-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="mt-1 border border-slate-200 rounded-md px-3 py-2 w-full text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm">Register</button>
        </form>

        <div className="mt-4 text-sm text-slate-700">
          <a className="text-indigo-600 underline" href="/login">Already have an account?</a>
        </div>
      </div>
    </LayoutCard>
  );
}