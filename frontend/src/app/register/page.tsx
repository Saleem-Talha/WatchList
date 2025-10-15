"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, username })
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
        <>
            <div className="mx-auto max-w-sm p-6 space-y-4">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" className="border p-2 w-full" />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="border p-2 w-full" />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="border p-2 w-full" />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button className="bg-black text-white px-4 py-2">Register</button>
                </form>
                <a className="text-blue-600 underline" href="/login">Already have an account?</a>
            </div>
        </>
    )
}