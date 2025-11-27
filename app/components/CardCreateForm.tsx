"use client";
import { useState } from "react";
import { usePostHog } from "posthog-js/react";

export default function CardCreateForm({ listId, refresh }: any) {
  const posthog = usePostHog();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function create() {
    setError("");

    if (!title.trim()) {
      setError("Card title cannot be empty.");
      return;
    }

    const res = await fetch("/api/cards", {
      method: "POST",
      body: JSON.stringify({ listId, title }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create card.");
      return;
    }

    posthog.capture("card_created", {
      list_id: listId,
      card_title: title,
    });

    setTitle("");
    refresh();
  }

  return (
    <div className="mt-3">
      <input
        className={`border p-2 w-full mb-2 ${
          error ? "border-red-500" : ""
        }`}
        placeholder="New card title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {error && <p className="text-red-600 text-sm mb-1">{error}</p>}

      <button
        onClick={create}
        className="bg-blue-600 text-white py-2 px-3 rounded w-full"
      >
        Add Card
      </button>
    </div>
  );
}
