import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Lodge from "@/models/Lodge";

type Params = { params: Promise<{ id: string }> };

function isAdmin(role?: string) {
  return role === "admin" || role === "superadmin";
}

// GET /api/admin/lodges/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const lodge = await Lodge.findById(id);
    if (!lodge)
      return NextResponse.json({ message: "Lodge not found" }, { status: 404 });
    return NextResponse.json(lodge);
  } catch (error) {
    console.error("Get admin lodge error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT /api/admin/lodges/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const lodge = await Lodge.findByIdAndUpdate(id, body, { new: true });
    if (!lodge)
      return NextResponse.json({ message: "Lodge not found" }, { status: 404 });
    return NextResponse.json({ message: "Lodge updated", lodge });
  } catch (error) {
    console.error("Update lodge error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE /api/admin/lodges/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const lodge = await Lodge.findByIdAndDelete(id);
    if (!lodge)
      return NextResponse.json({ message: "Lodge not found" }, { status: 404 });
    return NextResponse.json({ message: "Lodge deleted successfully" });
  } catch (error) {
    console.error("Delete lodge error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
