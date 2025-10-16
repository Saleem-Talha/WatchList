"use client";
import { useState } from "react";

type Props = {
  id: string;
  title?: string;
  onDeleted?: () => void; 
  onError?: (message: string) => void;
  className?: string;
};

export default function DeleteMediaItem({ id, title, onDeleted, onError, className }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${title ?? "this item"}"? This action cannot be undone.`)) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      onError?.("You must be logged in.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        onError?.(data.message || data.error || "Failed to delete item.");
        return;
      }

      onDeleted?.();
    } catch (err) {
      onError?.("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className={
        `${className ?? "text-xs px-2 py-1 rounded border border-red-100 text-red-600 hover:bg-red-50"}` +
        (loading ? " opacity-60 pointer-events-none" : "")
      }
      aria-label={`Delete media item ${title ?? id}`}
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}