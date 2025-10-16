"use client";

import { useState } from "react";

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

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, type, notes, imgUrl, status }),
      });

      const data = await res.json();
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
    <div className="shadow p-6 rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold">Add New Media Item</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border w-full p-2 rounded"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="anime">Anime</option>
        </select>

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <input
          type="url"
          placeholder="Image URL (optional)"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border w-full p-2 rounded"
        >
          <option value="planned">Planned</option>
          <option value="watching">Watching</option>
          <option value="watched">Watched</option>
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
