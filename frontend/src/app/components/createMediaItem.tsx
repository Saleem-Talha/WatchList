"use client";

import { useState } from "react";
import LayoutCard from "./Layout";

export default function CreateMediaItem() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("movie");
  const [notes, setNotes] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState("planned");
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
    <LayoutCard>
      <section className="bg-white border border-slate-100 shadow rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add New Media Item</h2>
            <p className="text-sm text-slate-600 mt-1">
              Save items to your watchlist — keep track of what to watch next.
            </p>
          </div>
          <div className="text-sm text-slate-500 px-3 py-1 rounded-md bg-slate-50">Quick Add</div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <div className="grid gap-1">
            <label className="text-xs text-slate-600">Title</label>
            <input
              type="text"
              placeholder="e.g. Inception"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder:text-slate-300"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label className="text-xs text-slate-600">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="movie" className=" text-black">Movie</option>
                <option value="series" className=" text-black" >Series</option>
                <option value="anime" className=" text-black">Anime</option>
              </select>
            </div>

            <div className="grid gap-1">
              <label className="text-xs text-slate-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="planned" className=" text-black">Planned</option>
                <option value="watching" className=" text-black">Watching</option>
                <option value="watched" className=" text-black">Watched</option>
              </select>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="text-xs text-slate-600">Notes</label>
            <textarea
              placeholder="Optional notes or reminder"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-2 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder:text-slate-300"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-xs text-slate-600">Image URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder:text-slate-300"
            />
          </div>

          {(error || success) && (
            <p className={`${error ? "text-red-600" : "text-green-600"} text-sm`}>{error || success}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 font-medium shadow-sm transition"
            >
              Save Item
            </button>
          </div>
        </form>
      </section>
    </LayoutCard>
  );
}
