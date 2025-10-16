"use client";
import { useState, useEffect, useMemo } from "react";
import MediaItem from "../types/MediaItem";
import LayoutCard from "./Layout";
import DeleteMediaItem from "./DeleteMediaItem";

export default function ShowMediaItem() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // small inline SVG placeholder used on image load errors
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-items`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });
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

  function statusClass(status: string) {
    switch (status) {
      case "watching":
        return "bg-yellow-100 text-yellow-800";
      case "watched":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  }

  return (
    <LayoutCard>
      <section className="bg-white border border-slate-100 shadow rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-slate-900">Your Media Items</h3>
          {success && <span className="text-sm text-green-600">{success}</span>}
        </div>

        {loading && <div className="py-8 text-center text-sm text-slate-500">Loading...</div>}
        {error && <div className="py-4 text-sm text-red-600">{error}</div>}

        {!loading && items.length === 0 && (
          <div className="py-8 text-center text-sm text-slate-500">
            No items found. Use the form to add something new.
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-md overflow-hidden divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-sm text-slate-600 bg-slate-50">
                  <th className="px-3 py-3">Title</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">Notes</th>
                  <th className="px-3 py-3">Image</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {items.map((it) => (
                  <tr key={it._id} className="text-sm hover:bg-slate-50 transition">
                    <td className="px-3 py-3 font-medium text-slate-900">{it.title}</td>
                    <td className="px-3 py-3 capitalize text-slate-600">{it.type}</td>
                    <td className="px-3 py-3 text-slate-600">{it.notes || <span className="text-slate-400">—</span>}</td>
                    <td className="px-3 py-3">
                      {it.imgUrl ? (
                        <img
                          src={it.imgUrl}
                          alt={it.title}
                          className="w-28 h-16 rounded-md object-cover border border-slate-100 shadow-sm"
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            img.onerror = null;
                            img.src = placeholder;
                          }}
                        />
                      ) : (
                        <div className="w-28 h-16 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                          No image
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusClass(it.status)}`}>
                        {it.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button
                          className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
                          onClick={() => console.log("open update modal for", it._id)}
                        >
                          Update
                        </button>

                        {}
                        <DeleteMediaItem
                          id={it._id}
                          title={it.title}
                          onDeleted={() => {
                            setItems((p) => p.filter((item) => item._id !== it._id));
                            setSuccess("Item deleted.");
                            setTimeout(() => setSuccess(""), 3000);
                          }}
                          onError={(msg) => setError(msg)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </LayoutCard>
  );
}
