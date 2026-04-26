import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'NAME, EMAIL, AND ACCESS KEY ARE ALL REQUIRED.' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if guest exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'A GUEST WITH THIS EMAIL IS ALREADY REGISTERED.' },
        { status: 400 }
      );
    }

    // Create new guest member
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'guest',
    });

    return NextResponse.json(
      { message: 'GUEST MEMBERSHIP INITIALIZED SUCCESSFULLY.', userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'AN ERROR OCCURRED DURING MEMBERSHIP INITIALIZATION.' },
      { status: 500 }
    );
  }
}
