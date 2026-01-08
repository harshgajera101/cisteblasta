import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  
  // Security Check: Is user logged in?
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, phone } = await req.json();
    await connectDB();

    // Update the user found by the session email
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user?.email },
      { name, phone },
      { new: true } // Return the updated document
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}