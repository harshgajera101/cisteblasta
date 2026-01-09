import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";

export async function PUT(req: Request) {
  try {
    const { orderId, newPrice } = await req.json();

    if (!orderId || newPrice === undefined) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const order = await OrderIntent.findById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const cakePrice = parseFloat(newPrice);
    const delivery = order.deliveryCharge || 0;

    // 1. Update the Item Price (The Custom Cake)
    // We target the first item since custom orders usually have just one item
    if (order.items.length > 0) {
        order.items[0].price = cakePrice;
    }

    // 2. Recalculate Total Amount
    order.totalAmount = cakePrice + delivery;

    await order.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update Price Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update price" }, { status: 500 });
  }
}