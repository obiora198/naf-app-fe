import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lodge from "@/models/Lodge";

type Params = { params: Promise<{ id: string }> };

// GET /api/lodges/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const lodge = await Lodge.findById(id);
    if (!lodge)
      return NextResponse.json({ message: "Lodge not found" }, { status: 404 });
    return NextResponse.json(lodge);
  } catch (error) {
    console.error("Get lodge error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
