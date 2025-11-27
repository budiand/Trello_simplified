import { NextResponse } from "next/server";
import connectDB from "@/db/mongoose";
import List from "@/models/List";

export async function GET(_: any, { params }: any) {
  await connectDB();
  const list = await List.findById(params.id);
  return NextResponse.json(list);
}

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const { name } = await req.json();

  // Block empty name
  if (!name || !name.trim()) {
    return NextResponse.json(
      { error: "List name cannot be empty." },
      { status: 400 }
    );
  }

  // Check if another list already has this name
  const exists = await List.findOne({
    name: name.trim(),
    _id: { $ne: params.id }, // exclude current list
  });

  if (exists) {
    return NextResponse.json(
      { error: "Another list with this name already exists." },
      { status: 400 }
    );
  }

  // Update list
  const list = await List.findByIdAndUpdate(
    params.id,
    { name: name.trim() },
    { new: true }
  );

  return NextResponse.json(list);
}

export async function DELETE(_: any, { params }: any) {
  await connectDB();
  await List.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "List deleted" });
}
