import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import OrderIntent from "@/lib/models/OrderIntent";

export async function GET() {
  try {
    await connectDB();

    // 1. Fetch all users (sorted by newest)
    // We exclude the password field for security
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });

    // 2. Aggregate Order Stats
    // We group orders by 'email' since that's the common link between User and OrderIntent
    const orderStats = await OrderIntent.aggregate([
      { 
        $group: { 
          _id: "$email", 
          totalOrders: { $sum: 1 },
          // Only sum amounts if the order was actually delivered
          totalSpent: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "DELIVERED"] }, "$totalAmount", 0] 
            } 
          }
        } 
      }
    ]);

    // 3. Merge User Data with calculated Stats
    const usersWithStats = users.map((user) => {
      // Find stats for this user (or default to 0)
      const stats = orderStats.find((s) => s._id === user.email) || { totalOrders: 0, totalSpent: 0 };
      
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        totalOrders: stats.totalOrders,
        totalSpent: stats.totalSpent,
      };
    });

    return NextResponse.json({ success: true, users: usersWithStats });
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return NextResponse.json({ success: false, users: [] }, { status: 500 });
  }
}