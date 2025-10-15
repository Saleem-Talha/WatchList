"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="mx-auto max-w-sm p-6 space-y-4">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="border p-2 w-full" placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="border p-2 w-full" placeholder="Password" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-black text-white px-4 py-2">Login</button>
      </form>
      <a className="text-blue-600 underline" href="/register">Don't have an account?</a>
    </div>
  );
}
