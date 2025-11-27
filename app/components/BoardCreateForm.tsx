"use client";
import { useState } from "react";
import { usePostHog } from "posthog-js/react";

export default function BoardCreateForm({ refresh }: any) {
  const posthog = usePostHog();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function create() {
    setError("");

    if (!name.trim()) {
      setError("Board name cannot be empty.");
      return;
    }

    const res = await fetch("/api/boards", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create board.");
      return;
    }

    posthog.capture("board_created", {
      board_name: name,
    });
    
    setName("");
    refresh();
  }

  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex gap-2">
        <input
          className={`border p-2 flex-1 ${
            error ? "border-red-500" : ""
          }`}
          placeholder="New board name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2"
          onClick={create}
        >
          Create
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}
