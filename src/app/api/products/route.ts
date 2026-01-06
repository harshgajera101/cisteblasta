import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    // Fetch all products and sort by creation date (newest first)
    const products = await Product.find({ isVisible: true }).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}