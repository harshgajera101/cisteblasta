// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth"; // FIX: Import from lib/auth
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";

// export async function GET() {
//   const session = await getServerSession(authOptions);
  
//   if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     await connectDB();
    
//     // Find orders strictly matching the user's email
//     const orders = await OrderIntent.find({ email: session.user?.email }).sort({ createdAt: -1 });
    
//     return NextResponse.json({ success: true, orders });
//   } catch (error) {
//     console.error("Order Fetch Error:", error);
//     return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
//   }
// }






import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // FIX: Import from lib/auth
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    
    // Find orders where the email matches the logged-in user
    const orders = await OrderIntent.find({ email: session.user?.email }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}