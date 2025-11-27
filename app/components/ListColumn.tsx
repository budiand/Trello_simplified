"use client";

import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import CardCreateForm from "./CardCreateForm";
import ListRenameModal from "./ListRenameModal";

export default function ListColumn({ list, refresh }: any) {
  const [cards, setCards] = useState<any[]>([]);
  const [openRename, setOpenRename] = useState(false);

  async function loadCards() {
    const res = await fetch(`/api/lists/${list._id}/cards`);
    setCards(await res.json());
  }

  async function deleteList() {
    await fetch(`/api/lists/${list._id}`, {
      method: "DELETE",
    });
    refresh();
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <>
      <div
        className="
          w-72
          bg-gradient-to-b from-gray-50 to-gray-200
          p-3
          rounded-xl
          shadow-md
          flex-shrink-0
          max-h-[75vh]
          flex
          flex-col
        "
      >
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="font-semibold text-gray-800 text-lg">{list.name}</h3>

          <div className="flex gap-2 text-sm">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setOpenRename(true)}
            >
              Rename
            </button>

            <button
              className="text-red-600 hover:underline"
              onClick={deleteList}
            >
              X
            </button>
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            gap-2
            overflow-y-auto
            pr-1
            scrollbar-thin
            scrollbar-thumb-gray-400
            scrollbar-track-gray-200
            mb-3
          "
        >
          {cards.map((card) => (
            <CardItem key={card._id} card={card} refresh={loadCards} />
          ))}
        </div>

        <CardCreateForm listId={list._id} refresh={loadCards} />
      </div>

      {openRename && (
        <ListRenameModal
          list={list}
          refresh={refresh}
          onClose={() => setOpenRename(false)}
        />
      )}
    </>
  );
}
