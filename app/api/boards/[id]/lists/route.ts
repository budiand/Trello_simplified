import { NextResponse } from "next/server";
import connectDB from "@/db/mongoose";
import List from "@/models/List";

export async function GET(_: any, { params }: any) {
  await connectDB();
  const lists = await List.find({ boardId: params.id }).sort({ createdAt: 1 });
  return NextResponse.json(lists);
}
