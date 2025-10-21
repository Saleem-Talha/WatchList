"use client";

import React, { useState } from "react";
import Layout from "./Layout";
import MediaItem from "../types/MediaItem";

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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <Layout title="Add Media Item" subtitle="Add a new item to your watchlist">
      <section className="bg-white border border-slate-100 shadow rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add New Media Item</h2>
            <p className="text-sm text-slate-700 mt-1">
              Save items to your watchlist — keep track of what to watch next.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <label className="text-xs text-slate-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Inception"
            className="mt-1 border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
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

          <label className="text-xs text-slate-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 border border-slate-200 rounded-md px-3 py-2 min-h-[90px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
          />

          <label className="text-xs text-slate-700">Image URL</label>
          <input
            type="url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="https://..."
            className="mt-1 border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
          />

          {(error || success) && (
            <p className={`${error ? "text-red-600" : "text-green-600"} text-sm`}>{error || success}</p>
          )}

          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 font-medium shadow-sm"
          >
            Save Item
          </button>
        </form>
      </section>
    </Layout>
  );
}
