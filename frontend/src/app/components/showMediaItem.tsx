"use client";
import React, { useState, useEffect, useMemo } from "react";
import MediaItem from "../types/MediaItem";
import Layout from "./Layout";
import DeleteMediaItem from "./DeleteMediaItem";
import UpdateMediaItem from "./UpdateMediaItem";
import { statusClass } from "../lib/statusClass";

export default function ShowMediaItem() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const placeholder =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect fill="%23f8fafc" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="%239ca3af">No image</text></svg>';

  const token = useMemo(
    () => (typeof window !== "undefined" ? localStorage.getItem("token") : null),
    []
  );

  useEffect(() => {
    if (!token) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      setError("");
      setSuccess("");
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
        const data = await res.json().catch(() => ([] as any));
        if (!res.ok) {
          setError(data.message || "Failed to fetch media items.");
          setLoading(false);
          return;
        }
        setItems(data);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Your Media</h2>
            <p className="mt-1 text-sm text-slate-600">
              {items.length} items in your collection
            </p>
          </div>
          {/* Add sort/filter controls here if needed */}
        </div>

        {loading && (
          <div className="py-8 text-center text-slate-600">
            <div className="animate-pulse">Loading your media items...</div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-600">No items found in your list.</p>
            <p className="mt-2 text-sm text-slate-500">
              Use the Add Media button to start building your collection.
            </p>
          </div>
        )}

        {items.length > 0 && (
          <div className="space-y-4">
            {items.map((it) => (
              <div
                key={it._id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                {/* Left side - Title and Info */}
                <div className="flex-1 pr-4">
                  <div className="text-sm font-medium text-slate-900">
                    {it.title}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      {it.type}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700">
                      Status:{" "}
                      <span
                        className={[
                          "inline-flex h-2.5 w-2.5 rounded-full",
                          statusClass(it.status),
                        ].join(" ")}
                        aria-hidden="true"
                      />
                      {it.status}
                    </span>
                  </div>
                </div>

                {/* Image - Placeholder or Actual Image */}
                <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md border border-slate-100">
                  {it.imgUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.imgUrl}
                      alt={it.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.onerror = null;
                        img.src = placeholder;
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-md border border-slate-100 bg-slate-50 text-xs text-slate-400">
                      No image
                    </div>
                  )}
                </div>

                {/* Actions - Update and Delete */}
                <div className="ml-4 flex flex-col gap-2">
                  <UpdateMediaItem
                    item={it}
                    onUpdated={(updated) => {
                      setItems((p) =>
                        p.map((x) => (x._id === updated._id ? updated : x))
                      );
                      setSuccess("Item updated.");
                      setTimeout(() => setSuccess(""), 3000);
                    }}
                    onError={(msg) => setError(msg)}
                  />
                  <DeleteMediaItem
                    id={it._id}
                    title={it.title}
                    onDeleted={() => {
                      setItems((p) =>
                        p.filter((item) => item._id !== it._id)
                      );
                      setSuccess("Item deleted.");
                      setTimeout(() => setSuccess(""), 3000);
                    }}
                    onError={(msg) => setError(msg)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Bits (styled to match your design language) ---------- */

function TableHeader({ as = "div" as const }: { as?: "div" | "thead" }) {
  const cls =
    "bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-600";
  const cells = (
    <>
      <th className="px-3 py-3">Title</th>
      <th className="px-3 py-3">Type</th>
      <th className="px-3 py-3">Notes</th>
      <th className="px-3 py-3">Image</th>
      <th className="px-3 py-3">Status</th>
      <th className="px-3 py-3">Actions</th>
    </>
  );

  if (as === "thead") {
    return (
      <thead className={cls}>
        <tr>{cells}</tr>
      </thead>
    );
  }
  return (
    <div className={cls}>
      <div className="grid grid-cols-6">
        <div className="px-3 py-3">Title</div>
        <div className="px-3 py-3">Type</div>
        <div className="px-3 py-3">Notes</div>
        <div className="px-3 py-3">Image</div>
        <div className="px-3 py-3">Status</div>
        <div className="px-3 py-3">Actions</div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-6 gap-0 px-3 py-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="py-1">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200/70" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 text-center shadow-sm">
      <p className="text-sm text-slate-700">
        No items found. Use the form to add something new.
      </p>
      <div className="mx-auto mt-4 h-28 w-44 rounded-xl border border-dashed border-slate-200 bg-slate-50/70" />
    </div>
  );
}
