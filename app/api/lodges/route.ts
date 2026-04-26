import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lodge from "@/models/Lodge";

// GET /api/lodges — list all available lodges
export async function GET() {
  try {
    await connectDB();
    const lodges = await Lodge.find({ isAvailable: true });
    return NextResponse.json(lodges);
  } catch (error) {
    console.error("Get lodges error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
