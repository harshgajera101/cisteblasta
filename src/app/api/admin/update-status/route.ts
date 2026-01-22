// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";

// export async function PUT(req: Request) {
//   try {
//     const { orderId, newStatus, rejectionReason } = await req.json();

//     await connectDB();

//     // Prepare update data
//     const updateData: any = { status: newStatus };
    
//     // If a reason is provided (usually when rejecting), save it
//     if (rejectionReason) {
//       updateData.rejectionReason = rejectionReason;
//     }

//     const updatedOrder = await OrderIntent.findByIdAndUpdate(
//       orderId,
//       updateData,
//       { new: true } 
//     );

//     if (!updatedOrder) {
//       return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, order: updatedOrder });
//   } catch (error) {
//     console.error("Update Status Error:", error);
//     return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
//   }
// }












import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";
import Product from "@/lib/models/Product"; // Import Product model

export async function PUT(req: Request) {
  try {
    const { orderId, newStatus, rejectionReason } = await req.json();

    await connectDB();

    // 1. Get the current order details BEFORE updating
    const existingOrder = await OrderIntent.findById(orderId);
    if (!existingOrder) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // 2. ANALYTICS LOGIC: If status changes TO 'DELIVERED'
    // We increment the soldCount for every item in this order
    if (newStatus === "DELIVERED" && existingOrder.status !== "DELIVERED") {
      for (const item of existingOrder.items) {
        // Find product by name and increment soldCount by the quantity ordered
        await Product.findOneAndUpdate(
          { name: item.name }, 
          { $inc: { soldCount: item.quantity } } 
        );
      }
    }

    // 3. Update the order status
    const updateData: any = { status: newStatus };
    if (rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const updatedOrder = await OrderIntent.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true } 
    );

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Update Status Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}