import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

type Params = { params: Promise<{ id: string }> };

function isAdmin(role?: string) {
  return role === "admin" || role === "superadmin";
}

// PUT /api/admin/users/[id]/role
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const { id } = await params;
    const { role: newRole } = await req.json();

    const validRoles = ["guest", "admin", "superadmin"];
    if (!validRoles.includes(newRole)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    user.role = newRole;
    await user.save();

    return NextResponse.json({ message: `Role updated to ${newRole}`, user });
  } catch (error) {
    console.error("Update user role error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const { id } = await params;
    await connectDB();
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    await user.deleteOne();
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
