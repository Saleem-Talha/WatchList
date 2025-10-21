"use client";
import React, { useState, useEffect } from "react";
import MediaItem from "../types/MediaItem";

type Props = {
  item: MediaItem;
  onUpdated?: (updated: MediaItem) => void;
  onError?: (message: string) => void;
  className?: string;
};

export default function UpdateMediaItem({ item, onUpdated, onError, className }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(item.title || "");
  const [type, setType] = useState<"movie" | "series" | "anime">(item.type || "movie");
  const [status, setStatus] = useState<"planned" | "watching" | "watched">(
    (item.status as any) || "planned"
  );
  const [notes, setNotes] = useState(item.notes || "");
  const [imgUrl, setImgUrl] = useState(item.imgUrl || "");

  useEffect(() => {
    // keep local state in sync if parent item changes
    setTitle(item.title || "");
    setType((item.type as "movie" | "series" | "anime") || "movie");
    setStatus((item.status as any) || "planned");
    setNotes(item.notes || "");
    setImgUrl(item.imgUrl || "");
  }, [item]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault?.();
    setLoading(true);
    onError?.("");

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      onError?.("You must be logged in.");
      setLoading(false);
      return;
    }

    try {
      const body = { title, type, status, notes, imgUrl };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-items/${item._id}`, {
        method: "PUT", // prefer PATCH for partial updates
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        onError?.(data.message || data.error || "Failed to update item.");
        setLoading(false);
        return;
      }

      onUpdated?.(data);
      setOpen(false);
    } catch (err) {
      onError?.("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? "text-xs px-2 py-1 rounded border border-slate-200 text-slate-900 hover:bg-slate-50"}
        aria-label={`Edit ${item.title}`}
      >
        Edit
      </button>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => !loading && setOpen(false)} />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-5 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-900">Edit item</h4>
              <button type="button" onClick={() => !loading && setOpen(false)} className="text-sm text-slate-600">
                ✕
              </button>
            </div>

            <div className="grid gap-3">
              <label className="text-xs text-slate-700">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
                required
              />

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-700">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="anime">Anime</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-700">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
                  >
                    <option value="planned">Planned</option>
                    <option value="watching">Watching</option>
                    <option value="watched">Watched</option>
                  </select>
                </div>
              </div>

              <label className="text-xs text-slate-700">Image URL</label>
              <input
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
              />

              <label className="text-xs text-slate-700">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 min-h-[80px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
              />

              <div className="flex items-center gap-2 justify-end pt-1">
                <button type="button" onClick={() => !loading && setOpen(false)} className="px-3 py-2 text-sm rounded-md bg-slate-100 text-slate-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-sm rounded-md bg-indigo-600 text-white ${loading ? "opacity-60 pointer-events-none" : "hover:bg-indigo-700"}`}
                >
                  {loading ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}