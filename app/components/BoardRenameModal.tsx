"use client";
import { useState } from "react";

export default function BoardRenameModal({ board, onClose, refresh }: any) {
  const [name, setName] = useState(board.name);
  const [error, setError] = useState("");

  async function save() {
    setError("");

    if (!name.trim()) {
      setError("Board name cannot be empty.");
      return;
    }

    const res = await fetch(`/api/boards/${board._id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to rename board.");
      return; // DO NOT close modal on error
    }

    refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4">Rename Board</h2>

        <input
          className={`border p-2 w-full mb-2 ${
            error ? "border-red-500" : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <div className="flex justify-between">
          <button
            className="bg-green-600 text-white px-4 py-2"
            onClick={save}
          >
            Save
          </button>

          <button
            className="bg-gray-400 text-white px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
