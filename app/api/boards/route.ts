import { NextResponse } from "next/server";
import connectDB from "@/db/mongoose";
import Board from "@/models/Board";

export async function GET() {
  await connectDB();
  const boards = await Board.find().sort({ createdAt: -1 });
  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  await connectDB();
  const { name } = await req.json();
  const exists = await Board.findOne({ name });
  if (exists) {
    return NextResponse.json(
      { error: "A board with this name already exists." },
      { status: 400 }
    );
  }
  const board = await Board.create({ name });
  return NextResponse.json(board);
}
