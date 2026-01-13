// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";

// export async function GET() {
//   try {
//     await connectDB();
//     // CHANGED: Default sort by 'updatedAt' (Latest activity first)
//     const orders = await OrderIntent.find().sort({ updatedAt: -1 });
//     return NextResponse.json({ success: true, orders });
//   } catch (error) {
//     console.error("Fetch Orders Error:", error);
//     return NextResponse.json({ success: false, orders: [] }, { status: 500 });
//   }
// }






// order delete

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";

export async function GET() {
  try {
    await connectDB();

    // --- OPTIMIZATION: Auto-Cleanup Logic ---
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);

    // 1. Delete PENDING orders older than 2 days (Abandoned)
    await OrderIntent.deleteMany({
      status: "PENDING",
      updatedAt: { $lt: twoDaysAgo }
    });

    // 2. Delete REJECTED orders (Payment is not done) older than 15 days
    await OrderIntent.deleteMany({
      status: "CANCELLED",
      rejectionReason: "Payment is not done",
      updatedAt: { $lt: fifteenDaysAgo }
    });
    // ----------------------------------------

    // Fetch remaining orders, sorted by latest activity
    const orders = await OrderIntent.find().sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ success: false, orders: [] }, { status: 500 });
  }
}