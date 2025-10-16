"use client";
import { useState, useEffect, useMemo } from "react";
import MediaItem from "../types/MediaItem";
export default function ShowMediaItem() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = useMemo(
    () =>
      typeof window !== "undefined" ? localStorage.getItem("token") : null,
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
        const data = await res.json();
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

  async function handleDelete(id: string) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("You must be logged in.");
      return;
    }
    setError("");
    setSuccess("");
    const prev = items;
    setItems((p) => p.filter((it) => it._id !== id));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/media-items/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setItems(prev); // rollback
        setError(data.message || data.error || "Failed to delete item.");
        return;
      }
      setSuccess("Item deleted.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setItems(prev);
      return;
    }
  }

  return (
    <>
      <div className="shadow p-6 rounded-2xl space-y-4">
        <div className="text-xl font-semibold">Your Media Items</div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && items.length == 0 && (
          <p className="text-sm text-gray-600">
            No items found. Add one above!
          </p>
        )}
        {!loading && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded">
                <thead className=" text-left text-sm">
                   
                    <tr>
                        
                        <th className="px-3 py-2 border-b">Title</th>
                        <th className="px-3 py-2 border-b">Type</th>
                        <th className="px-3 py-2 border-b">Notes</th>
                        <th className="px-3 py-2 border-b">Image</th>
                        <th className="px-3 py-2 border-b">Status</th>
                        <th className="px-3 py-2 border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((it) => (
                        <tr key={it._id} className="text-sm">
                        <td className="px-3 py-2 border-b">{it.title}</td>
                        <td className="px-3 py-2 border-b capitalize">{it.type}</td>
                        <td className="px-3 py-2 border-b">
                            {it.notes || <span className="text-gray-400">—</span>}
                        </td>
                        <td className="px-3 py-2 border-b">
                            {it.imgUrl ? (
                            <a
                                href={it.imgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                View
                            </a>
                            ) : (
                            <span className="text-gray-400">—</span>
                            )}
                        </td>
                        <td className="px-3 py-2 border-b">{it.status}</td>
                        <td className="px-3 py-2 border-b">
                            <div className="flex gap-2">
                            <button
                                className="text-xs border px-2 py-1 rounded"
                                onClick={() =>
                                console.log("open update modal for", it._id)
                                }
                            >
                                Update
                            </button>
                            <button
                                className="text-xs border px-2 py-1 rounded"
                                onClick={() => handleDelete(it._id)}
                            >
                                Delete
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
