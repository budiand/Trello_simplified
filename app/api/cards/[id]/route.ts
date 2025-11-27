import { NextResponse } from "next/server";
import connectDB from "@/db/mongoose";
import Card from "@/models/Card";

export async function GET(_: any, { params }: any) {
  await connectDB();
  const card = await Card.findById(params.id);
  return NextResponse.json(card);
}

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const { title, description } = await req.json();

  if (!title || !title.trim()) {
    return NextResponse.json(
      { error: "Card title cannot be empty." },
      { status: 400 }
    );
  }

  // Find the card so we know its listId
  const currentCard = await Card.findById(params.id);
  if (!currentCard) {
    return NextResponse.json(
      { error: "Card not found." },
      { status: 404 }
    );
  }

  // Check if another card in the same list has this title
  const exists = await Card.findOne({
    listId: currentCard.listId,
    title: title.trim(),
    _id: { $ne: params.id }, // exclude current card
  });

  if (exists) {
    return NextResponse.json(
      { error: "Another card with this title already exists in this list." },
      { status: 400 }
    );
  }

  // Update card
  const updated = await Card.findByIdAndUpdate(
    params.id,
    { title: title.trim(), description },
    { new: true }
  );

  return NextResponse.json(updated);
}


export async function DELETE(_: any, { params }: any) {
  await connectDB();
  await Card.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Card deleted" });
}
