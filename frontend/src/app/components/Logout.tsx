"use client";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  className?: string;
  confirm?: boolean;
};

export default function Logout({ className, confirm = false }: Props) {
  const router = useRouter();

  function doLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  }

  function handleClick() {
    if (confirm) {
      if (!window.confirm("Are you sure you want to log out?")) return;
    }
    doLogout();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ??
        "ml-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-sm text-sm"
      }
      aria-label="Logout"
    >
      Logout
    </button>
  );
}