import { NextResponse } from "next/server";
import connectDB from "@/db/mongoose";
import List from "@/models/List";

export async function POST(req: Request) {
  await connectDB();
  const { boardId, name } = await req.json();
  // Check uniqueness inside the same board
  const exists = await List.findOne({ boardId, name });
  if (exists) {
    return NextResponse.json(
      { error: "A list with this name already exists in this board." },
      { status: 400 }
    );
  }
  const list = await List.create({ boardId, name });
  return NextResponse.json(list);
}
