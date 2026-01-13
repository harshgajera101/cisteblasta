// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";

// export async function PUT(req: Request) {
//   try {
//     const { orderId, newStatus } = await req.json();

//     await connectDB();

//     const updatedOrder = await OrderIntent.findByIdAndUpdate(
//       orderId,
//       { status: newStatus },
//       { new: true } // Return the updated document so UI updates immediately
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











// order delete

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";

export async function PUT(req: Request) {
  try {
    const { orderId, newStatus, rejectionReason } = await req.json();

    await connectDB();

    // Prepare update data
    const updateData: any = { status: newStatus };
    
    // If a reason is provided (usually when rejecting), save it
    if (rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const updatedOrder = await OrderIntent.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true } 
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Update Status Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}