import { NextResponse } from "next/server";
import connectDB from "@/db/mongoose";
import Board from "@/models/Board";

export async function GET(_: any, { params }: any) {
  await connectDB();
  const board = await Board.findById(params.id);
  return NextResponse.json(board);
}

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const { name } = await req.json();

  // Block empty name
  if (!name || !name.trim()) {
    return NextResponse.json(
      { error: "Board name cannot be empty." },
      { status: 400 }
    );
  }

  // Check if another board already has this name
  const exists = await Board.findOne({
    name: name.trim(),
    _id: { $ne: params.id }, // exclude current board
  });

  if (exists) {
    return NextResponse.json(
      { error: "Another board with this name already exists." },
      { status: 400 }
    );
  }

  // Update board
  const board = await Board.findByIdAndUpdate(
    params.id,
    { name: name.trim() },
    { new: true }
  );

  return NextResponse.json(board);
}

export async function DELETE(_: any, { params }: any) {
  await connectDB();
  await Board.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Board deleted" });
}
