import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// POST /api/auth/register
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({ name, email, password });

    return NextResponse.json(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
