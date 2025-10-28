"use client";

import React, { useState } from "react";
import Layout from "./Layout";

export default function CreateMediaItem() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"movie" | "series" | "anime">("movie");
  const [notes, setNotes] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState<"planned" | "watching" | "watched">("planned");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, type, notes, imgUrl, status }),
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        setError(data.message || "Failed to create media item.");
        return;
      }

      setSuccess("Media item created successfully!");
      setTitle("");
      setNotes("");
      setImgUrl("");
      setType("movie");
      setStatus("planned");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <Layout>
      {/* Card shell matching your theme */}
      <section className="relative rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur">
        {/* subtle background grid inside the card */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-2xl">
          <div className="absolute inset-0 rounded-2xl [background-image:linear-gradient(to_right,rgba(30,41,59,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,.05)_1px,transparent_1px)] [background-size:22px_22px]" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              New item
            </span>
            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              Add New Media Item
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              Save items to your watchlist — keep track of what to watch next.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="text-xs font-medium uppercase tracking-wide text-slate-600"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Inception"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              required
            />
          </div>

          {/* Type & Status */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="type"
                className="text-xs font-medium uppercase tracking-wide text-slate-600"
              >
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="anime">Anime</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="text-xs font-medium uppercase tracking-wide text-slate-600"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="planned">Planned</option>
                <option value="watching">Watching</option>
                <option value="watched">Watched</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-end justify-between">
              <label
                htmlFor="notes"
                className="text-xs font-medium uppercase tracking-wide text-slate-600"
              >
                Notes
              </label>
              <span className="text-[11px] text-slate-500">
                Optional — thoughts, where to stream, etc.
              </span>
            </div>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 min-h-[110px] w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {/* Image URL + Preview */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label
                htmlFor="imgUrl"
                className="text-xs font-medium uppercase tracking-wide text-slate-600"
              >
                Image URL
              </label>
              <input
                id="imgUrl"
                type="url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://image.tmdb.org/t/p/w300/..."
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Paste a poster URL — you can change it later.
              </p>
            </div>

            <div className="sm:col-span-1">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
                Preview
              </span>
              <div className="mt-2 flex h-[110px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white/60 shadow-sm">
                {imgUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imgUrl}
                    alt="Poster preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No image</span>
                )}
              </div>
            </div>
          </div>

          {/* Alerts */}
          {(error || success) && (
            <div
              className={[
                "rounded-xl border px-3 py-2 text-sm",
                error
                  ? "border-red-200 bg-red-50/70 text-red-700"
                  : "border-emerald-200 bg-emerald-50/70 text-emerald-700",
              ].join(" ")}
            >
              {error || success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
          >
            Save Item
          </button>
        </form>
      </section>
    </Layout>
  );
}
