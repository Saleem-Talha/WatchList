"use client";

import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import type MediaItem from "../types/MediaItem";

/**
 * CreateReminder — restyled to match your glassy/indigo aesthetic:
 * - Card: bg-white/90, thin border, subtle shadow, backdrop blur, grid ornament
 * - Inputs: rounded-xl, soft borders, indigo focus ring
 * - Badges & helper text: tiny uppercase labels, pills
 * - Alerts: tinted success/error boxes
 */
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
    ? items.filter((it) =>
        it.title?.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  return (
    <Layout>
      {/* Card shell */}
      <section className="relative rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur">
        {/* subtle grid ornament */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        >
          <div className="absolute inset-0 rounded-2xl [background-image:linear-gradient(to_right,rgba(30,41,59,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,.05)_1px,transparent_1px)] [background-size:22px_22px]" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Reminders
            </span>
            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              Create Reminder
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              Schedule a reminder for an item in your media list.
            </p>
          </div>
        </div>

        {/* Alerts */}
        {(error || success) && (
          <div
            className={[
              "mt-4 rounded-xl border px-3 py-2 text-sm",
              error
                ? "border-red-200 bg-red-50/70 text-red-700"
                : "border-emerald-200 bg-emerald-50/70 text-emerald-700",
            ].join(" ")}
          >
            {error || success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          {/* Media Title (search) */}
          <div>
            <label
              htmlFor="search"
              className="text-xs font-medium uppercase tracking-wide text-slate-600"
            >
              Media Title
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedId(""); // clear selected id when typing
              }}
              placeholder={
                loadingItems
                  ? "Loading your items..."
                  : "Type to search or choose from list"
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              disabled={loadingItems}
              aria-label="Search media title"
            />
          </div>

          {/* Select from your items */}
          <div>
            <div className="flex items-end justify-between">
              <label
                htmlFor="selectItem"
                className="text-xs font-medium uppercase tracking-wide text-slate-600"
              >
                Select from your items (optional)
              </label>
              <span className="text-[11px] text-slate-500">
                Selecting ensures the reminder links to the correct item.
              </span>
            </div>
            <select
              id="selectItem"
              value={selectedId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedId(id);
                const it = items.find((x) => x._id === id);
                setSearch(it?.title ?? "");
              }}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option value="">-- choose a title from your list --</option>
              {filtered.map((it) => (
                <option key={it._id} value={it._id}>
                  {it.title} {it.type ? ` • ${it.type}` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Planned date/time */}
          <div>
            <label
              htmlFor="plannedAt"
              className="text-xs font-medium uppercase tracking-wide text-slate-600"
            >
              Planned Date & Time
            </label>
            <input
              id="plannedAt"
              type="datetime-local"
              value={plannedAt}
              onChange={(e) => setPlannedAt(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              required
            />
            <p className="mt-1 text-[11px] text-slate-500">
              We’ll email you at the selected time and also ahead of time based
              on the lead minutes.
            </p>
          </div>

          {/* Lead minutes */}
          <div>
            <div className="flex items-end justify-between">
              <label
                htmlFor="leadMinutes"
                className="text-xs font-medium uppercase tracking-wide text-slate-600"
              >
                Lead Minutes
              </label>
              <span className="text-[11px] text-slate-500">
                Example: <span className="font-medium">60</span> = 1 hour before
              </span>
            </div>
            <input
              id="leadMinutes"
              type="number"
              min={0}
              max={10080}
              value={leadMinutes}
              onChange={(e) => setLeadMinutes(Number(e.target.value))}
              placeholder="e.g. 60 (1 hour before)"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
          >
            Save Reminder
          </button>
        </form>
      </section>
    </Layout>
  );
}
