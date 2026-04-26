import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

function isAdmin(role?: string) {
  return role === "admin" || role === "superadmin";
}

// GET /api/admin/bookings
export async function GET() {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || !isAdmin(role)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    await connectDB();
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("lodge", "name base");
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Get admin bookings error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
