import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent"; // Ensure this matches your checkout model

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    
    // Find orders where the email matches the logged-in user
    // Sort by newest first (createdAt: -1)
    const orders = await OrderIntent.find({ email: session.user?.email }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}