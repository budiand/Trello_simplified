"use client";
import { useState } from "react";
import CardModal from "./CardModal";

export default function CardItem({ card, refresh }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white p-3 rounded shadow cursor-pointer mb-2"
        onClick={() => setOpen(true)}
      >
        {card.title}
      </div>

      {open && (
        <CardModal
          card={card}
          onClose={() => setOpen(false)}
          refresh={refresh}
        />
      )}
    </>
  );
}
