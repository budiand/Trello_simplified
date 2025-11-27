"use client";

import Link from "next/link";

export default function BoardCard({ board, onDelete, onRename }: any) {
  return (
    <div className="border p-4 rounded shadow bg-white relative">
      <Link href={`/board/${board._id}`}>
        <h2 className="font-semibold text-xl cursor-pointer">{board.name}</h2>
      </Link>

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="text-blue-600 text-sm"
          onClick={() => onRename(board)}
        >
          Rename
        </button>

        <button
          className="text-red-600 text-sm"
          onClick={() => onDelete(board._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
