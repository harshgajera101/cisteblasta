import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure this path matches your auth config
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import Product from "@/lib/models/Product"; // Used for population

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDB();
    
    // Fetch user and populate wishlist
    const user = await User.findOne({ email: session.user.email }).populate("wishlist");
    
    return NextResponse.json({ success: true, wishlist: user.wishlist || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    if (!productId) return NextResponse.json({ success: false, error: "Product ID required" }, { status: 400 });

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    // Check if item exists in wishlist
    const index = user.wishlist.indexOf(productId);
    
    let isAdded = false;
    if (index === -1) {
      // Add
      user.wishlist.push(productId);
      isAdded = true;
    } else {
      // Remove
      user.wishlist.splice(index, 1);
      isAdded = false;
    }

    await user.save();
    return NextResponse.json({ success: true, isAdded });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}