"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode;
    redirectTo?: string;
};

/**
 * RequireAuth - Client-side guard component.
 * - Redirects to /login if no token is present in localStorage.
 * - Shows a small checking UI while verifying.
 * Use by wrapping protected pages/components:
 * <RequireAuth><Dashboard /></RequireAuth>
 */
export default function RequireAuth({ children, redirectTo = "/login" }: Props) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // Make sure this runs client-side
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
            // Replace so user can't go back to protected page
            router.replace(redirectTo);
            return;
        }
        // token exists -> allow render
        setChecking(false);
    }, [router, redirectTo]);

    if (checking) {
        return (
            <div className="min-h-[240px] flex items-center justify-center text-slate-700">
                Checking authentication...
            </div>
        );
    }

    return <>{children}</>;
}