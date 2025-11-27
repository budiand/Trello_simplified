import { NextResponse } from "next/server";
import connectDB from "@/db/mongoose";
import Card from "@/models/Card";

export async function POST(req: Request) {
  await connectDB();
  const { listId, title } = await req.json();
  // Prevent duplicate card names inside the same list
  const exists = await Card.findOne({ listId, title });
  if (exists) {
    return NextResponse.json(
      { error: "A card with this title already exists in this list." },
      { status: 400 }
    );
  }
  const card = await Card.create({ listId, title });
  return NextResponse.json(card);
}
