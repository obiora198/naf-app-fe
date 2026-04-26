import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

function isAdmin(role?: string) {
  return role === "admin" || role === "superadmin";
}

// GET /api/admin/users
export async function GET() {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    await connectDB();
    const users = await User.find().select("-password");
    return NextResponse.json(users);
  } catch (error) {
    console.error("Get admin users error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
