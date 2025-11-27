import { NextResponse } from "next/server";
import connectDB from "@/db/mongoose";
import Card from "@/models/Card";

export async function GET(_: any, { params }: any) {
  await connectDB();
  const cards = await Card.find({ listId: params.id }).sort({ createdAt: 1 });
  return NextResponse.json(cards);
}
