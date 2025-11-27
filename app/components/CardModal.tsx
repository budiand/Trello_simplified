"use client";
import { useState } from "react";

export default function CardModal({ card, onClose, refresh }: any) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [error, setError] = useState("");

  async function save() {
    setError("");

    if (!title.trim()) {
      setError("Card title cannot be empty.");
      return;
    }

    const res = await fetch(`/api/cards/${card._id}`, {
      method: "PUT",
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to update card.");
      return;
    }

    refresh();
    onClose();
  }

  async function deleteCard() {
    setError("");

    const res = await fetch(`/api/cards/${card._id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setError("Failed to delete card.");
      return;
    }

    refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96 relative">

        <h2 className="text-xl font-semibold mb-4">Edit Card</h2>

        <input
          className={`border p-2 w-full mb-2 ${
            error ? "border-red-500" : ""
          }`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />

        <textarea
          className="border p-2 w-full mb-4 min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-3 pointer-events-none">
            {error}
          </p>
        )}

        <div className="flex justify-between mt-2">
          <button
            className="bg-green-600 text-white px-4 py-2"
            onClick={save}
          >
            Save
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2"
            onClick={deleteCard}
          >
            Delete
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
