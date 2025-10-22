"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutCard from "@/app/components/Layout";
import PublicLayout from "@/app/components/PublicLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  function validate() {
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address.";
    if (!password) return "Please enter your password.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        setError(data?.message || data?.error || "Login failed. Please try again.");
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/dashboard");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout>
      {/* Background ornaments to match the register/landing style.
          If your PublicLayout already provides this, you can remove this block. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-28 top-[-10%] h-[420px] w-[420px] rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute -right-28 bottom-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(30,41,59,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,.06)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="mx-auto max-w-md px-6 py-12">
        <LayoutCard title="Sign in" subtitle="Access your WatchList account.">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-medium text-slate-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none ring-0 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-700">Password</label>
                
              </div>
              <div className="mt-1 relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 pr-10 text-slate-900 placeholder:text-slate-400 outline-none ring-0 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Login"}
            </button>

            {/* Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-slate-500">New to WatchList?</span>
              </div>
            </div>

            {/* Secondary actions */}
            <a
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Create an account
            </a>
          </form>
        </LayoutCard>
      </div>
    </PublicLayout>
  );
}

/* ---------------- Icons ---------------- */

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 5c-5.5 0-9 4.5-9 7s3.5 7 9 7 9-4.5 9-7-3.5-7-9-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2.5A2.5 2.5 0 1 0 12 9a2.5 2.5 0 0 0 0 5Z" />
    </svg>
  );
}

function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3.3 2.3a1 1 0 0 0-1.4 1.4l3 3A11.6 11.6 0 0 0 3 12c0 2.5 3.5 7 9 7 2 0 3.8-.6 5.2-1.5l3.5 3.5a1 1 0 0 0 1.4-1.4l-19-19Zm9.3 16.2c-4.5 0-7-3.9-7.7-5.5a9.8 9.8 0 0 1 3.1-3.5l2.1 2.1a4 4 0 0 0 5.6 5.6l1.3 1.3c-1.2.6-2.6 1-4.4 1Zm7.7-6.5c-.3.6-.8 1.5-1.7 2.6l-2.3-2.3a4 4 0 0 0-5-5l-1.8-1.8c1-.2 2-.3 3-.3 4.5 0 7 3.9 7.7 5.5Z" />
    </svg>
  );
}
