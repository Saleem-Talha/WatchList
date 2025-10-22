"use client";

import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import type MediaItem from "../types/MediaItem";

export default function CreateReminder() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [plannedAt, setPlannedAt] = useState("");
  const [leadMinutes, setLeadMinutes] = useState(60);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // fetch current user's media items so we can map title -> id
  useEffect(() => {
    (async () => {
      setLoadingItems(true);
      setError("");
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("You must be logged in to create reminders.");
        setLoadingItems(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/media-items`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );
        const data = await res.json().catch(() => []);
        if (!res.ok) {
          setError(data.message || "Failed to load your media items.");
          setItems([]);
          return;
        }
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load your media items.");
      } finally {
        setLoadingItems(false);
      }
    })();
  }, []);

  // helper: try to resolve a media id from current items by title
  function resolveIdFromTitle(title: string) {
    if (!title) return "";
    const found = items.find(
      (it) => it.title?.toLowerCase().trim() === title.toLowerCase().trim()
    );
    return found ? found._id : "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    // prefer selectedId; otherwise try to resolve from exact title match in search input
    let mediaItemId = selectedId;
    if (!mediaItemId && search) {
      mediaItemId = resolveIdFromTitle(search);
    }

    if (!mediaItemId) {
      setError(
        "Please select a media item from your list or enter an exact title that appears in your list."
      );
      return;
    }

    if (!plannedAt) {
      setError("Please select a planned date and time.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reminders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mediaItemId,
            plannedAt: new Date(plannedAt).toISOString(),
            leadMinutes,
          }),
        }
      );

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        setError(data.message || "Failed to create reminder.");
        return;
      }

      setSuccess("Reminder created successfully!");
      // reset form
      setSelectedId("");
      setSearch("");
      setPlannedAt("");
      setLeadMinutes(60);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  // filtered items for simple search dropdown
  const filtered = search
    ? items.filter((it) => it.title?.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <Layout>
      <section className="bg-white border border-slate-100 shadow rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Create Reminder
            </h2>
            <p className="text-sm text-slate-700 mt-1">
              Schedule a reminder for an item in your media list.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <label className="text-xs text-slate-700">Media Title</label>

          {/* search input to filter user's items */}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              // clear selected id when typing to allow re-selection
              setSelectedId("");
            }}
            placeholder={
              loadingItems
                ? "Loading your items..."
                : "Type to search or choose from list"
            }
            className="mt-1 border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            disabled={loadingItems}
            aria-label="Search media title"
          />

          {/* dropdown of matching items to pick exact title -> id */}
          <div>
            <label className="text-xs text-slate-700">
              Select from your items (optional)
            </label>
            <select
              value={selectedId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedId(id);
                const it = items.find((x) => x._id === id);
                setSearch(it?.title ?? "");
              }}
              className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">-- choose a title from your list --</option>
              {filtered.map((it) => (
                <option key={it._id} value={it._id}>
                  {it.title} {it.type ? ` • ${it.type}` : ""}
                </option>
              ))}
            </select>
            <div className="text-xs text-slate-500 mt-1">
              Selecting will populate the title field and ensure the id belongs to
              your account.
            </div>
          </div>

          <label className="text-xs text-slate-700">Planned Date & Time</label>
          <input
            type="datetime-local"
            value={plannedAt}
            onChange={(e) => setPlannedAt(e.target.value)}
            className="mt-1 border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
            required
          />

          <label className="text-xs text-slate-700">Lead Minutes</label>
          <input
            type="number"
            min={0}
            max={10080}
            value={leadMinutes}
            onChange={(e) => setLeadMinutes(Number(e.target.value))}
            placeholder="e.g. 60 (1 hour before)"
            className="mt-1 border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
          />

          {(error || success) && (
            <p
              className={`${
                error ? "text-red-600" : "text-green-600"
              } text-sm`}
            >
              {error || success}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 font-medium shadow-sm"
          >
            Save Reminder
          </button>
        </form>
      </section>
    </Layout>
  );
}
