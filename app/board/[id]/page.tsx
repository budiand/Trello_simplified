"use client";

import { useEffect, useState } from "react";
import ListColumn from "../../components/ListColumn";
import ListCreateForm from "../../components/ListCreateForm";

export default function BoardPage({ params }: any) {
  const [board, setBoard] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);

  async function loadBoard() {
    const res = await fetch(`/api/boards/${params.id}`);
    setBoard(await res.json());
  }

  async function loadLists() {
    const res = await fetch(`/api/boards/${params.id}/lists`);
    setLists(await res.json());
  }

  useEffect(() => {
    loadBoard();
    loadLists();
  }, []);

  if (!board)
    return (
      <div className="p-10 min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 text-indigo-700">
        Loading...
      </div>
    );

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700 drop-shadow-md">
        {board.name}
      </h1>

      <div className="flex gap-6 overflow-x-auto items-start pb-4">
        {lists.map((list) => (
          <ListColumn key={list._id} list={list} refresh={loadLists} />
        ))}

        <ListCreateForm boardId={board._id} refresh={loadLists} />
      </div>
    </div>
  );
}
