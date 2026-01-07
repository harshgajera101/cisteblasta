import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // 2. Hash the password (Security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the User
    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true, message: "Account created!" });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}