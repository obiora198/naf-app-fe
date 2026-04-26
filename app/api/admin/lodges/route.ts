import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Lodge from "@/models/Lodge";

function isAdmin(role?: string) {
  return role === "admin" || role === "superadmin";
}

// GET /api/admin/lodges
export async function GET() {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    await connectDB();
    const lodges = await Lodge.find();
    return NextResponse.json(lodges);
  } catch (error) {
    console.error("Get admin lodges error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST /api/admin/lodges
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    await connectDB();
    const body = await req.json();
    const lodge = await Lodge.create(body);
    return NextResponse.json(lodge, { status: 201 });
  } catch (error) {
    console.error("Create lodge error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
