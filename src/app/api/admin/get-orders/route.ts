// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";

// export async function GET() {
//   try {
//     await connectDB();
//     // Fetch all orders, sorted by newest first
//     const orders = await OrderIntent.find().sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, orders });
//   } catch (error) {
//     console.error("Fetch Orders Error:", error);
//     return NextResponse.json({ success: false, orders: [] }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";

export async function GET() {
  try {
    await connectDB();
    // CHANGED: Default sort by 'updatedAt' (Latest activity first)
    const orders = await OrderIntent.find().sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ success: false, orders: [] }, { status: 500 });
  }
}