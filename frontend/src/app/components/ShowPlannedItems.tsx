"use client";
import { useState, useEffect, useMemo } from "react";
import MediaItem from "../types/MediaItem";
import Layout from "./Layout";
import { statusClass } from "../lib/statusClass";

export default function ShowPlannedItems() {
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/media-items/status/planned`,
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
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <Layout>
      {/* Card shell — glassy, bordered, subtle grid to match your system */}
      <section className="relative rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm backdrop-blur">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        >
          <div className="absolute inset-0 rounded-2xl [background-image:linear-gradient(to_right,rgba(30,41,59,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,.05)_1px,transparent_1px)] [background-size:22px_22px]" />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Planned
            </span>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              Your Planned Items
            </h3>
            <p className="mt-1 text-sm text-slate-700">
              Everything you’ve marked as <span className="font-medium">planned</span>.
            </p>
          </div>
          {success && (
            <span className="rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 text-sm font-medium text-emerald-700">
              {success}
            </span>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50/70 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white/70">
            <TableHeader />
            <div className="divide-y divide-slate-100">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          </div>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden rounded-xl border border-slate-100 bg-white/80 text-sm shadow-sm">
              <TableHeader as="thead" />
              <tbody className="divide-y divide-slate-100">
                {items.map((it) => (
                  <tr key={it._id} className="transition hover:bg-slate-50/70">
                    {/* Title */}
                    <td className="px-3 py-3 font-medium text-slate-900">
                      <div className="max-w-xs truncate sm:max-w-sm">{it.title}</div>
                    </td>

                    {/* Type */}
                    <td className="px-3 py-3 capitalize text-slate-700">
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                        {it.type}
                      </span>
                    </td>

                    {/* Notes */}
                    <td className="px-3 py-3 text-slate-700">
                      <div className="max-w-md truncate">
                        {it.notes || <span className="text-slate-400">—</span>}
                      </div>
                    </td>

                    {/* Image */}
                    <td className="px-3 py-3">
                      {it.imgUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={it.imgUrl}
                          alt={it.title}
                          className="h-16 w-28 rounded-md border border-slate-100 object-cover shadow-sm"
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            img.onerror = null;
                            img.src = placeholder;
                          }}
                        />
                      ) : (
                        <div className="flex h-16 w-28 items-center justify-center rounded-md border border-slate-100 bg-slate-50 text-xs text-slate-400">
                          No image
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium capitalize",
                          statusClass(it.status),
                        ].join(" ")}
                      >
                        {it.status}
                      </span>
                    </td>

                    {/* Actions (placeholder for future controls) */}
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        {/* Intentionally left for future: schedule reminder, mark watching, etc. */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
}

/* ---------- Bits (shared look) ---------- */

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
