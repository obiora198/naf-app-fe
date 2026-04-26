import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

// POST /api/bookings — create a new booking (must be logged in)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const { lodge, checkIn, checkOut, totalAmount } = await req.json();

    await connectDB();
    const booking = await Booking.create({
      user: session.user.id,
      lodge,
      checkIn,
      checkOut,
      totalAmount,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// GET /api/bookings — get current user's bookings
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await connectDB();
    const bookings = await Booking.find({ user: session.user.id }).populate(
      "lodge"
    );
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
