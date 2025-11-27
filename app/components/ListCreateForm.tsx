"use client";
import { useState } from "react";
import { usePostHog } from "posthog-js/react";

export default function ListCreateForm({ boardId, refresh }: any) {
  const posthog = usePostHog();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function create() {
    setError("");

    if (!name.trim()) {
      setError("List name cannot be empty.");
      return;
    }

    const res = await fetch("/api/lists", {
      method: "POST",
      body: JSON.stringify({ boardId, name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create list.");
      return;
    }

    posthog.capture("list_created", {
      board_id: boardId,
      list_name: name,
    });

    setName("");
    refresh();
  }

  return (
    <div className="w-64 bg-white p-3 rounded border flex-shrink-0">
      <input
        className={`border p-2 w-full mb-2 ${
          error ? "border-red-500" : ""
        }`}
        placeholder="New list name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <button
        onClick={create}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        Create List
      </button>
    </div>
  );
}
