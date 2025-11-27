"use client";

import { useEffect, useState } from "react";
import BoardCard from "./components/BoardCard";
import BoardCreateForm from "./components/BoardCreateForm";
import BoardRenameModal from "./components/BoardRenameModal";

export default function Home() {
  const [boards, setBoards] = useState<any[]>([]);
  const [renameTarget, setRenameTarget] = useState<any>(null);

  async function loadBoards() {
    const res = await fetch("/api/boards");
    setBoards(await res.json());
  }

  async function deleteBoard(id: string) {
    await fetch(`/api/boards/${id}`, {
      method: "DELETE",
    });
    loadBoards();
  }

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <h1 className="text-4xl mb-6 font-bold text-indigo-700 drop-shadow-md">
        Boards
      </h1>

      {/* Create Board */}
      <div className="mb-6">
        <BoardCreateForm refresh={loadBoards} />
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boards.map((board) => (
          <BoardCard
            key={board._id}
            board={board}
            onDelete={deleteBoard}
            onRename={() => setRenameTarget(board)}
          />
        ))}
      </div>

      {/* Rename Modal */}
      {renameTarget && (
        <BoardRenameModal
          board={renameTarget}
          onClose={() => setRenameTarget(null)}
          refresh={loadBoards}
        />
      )}
    </div>
  );
}
